import {
  Alert,
  Button,
  Card,
  FloatButton,
  Form,
  Input,
  List,
  Modal,
  Typography,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import Search from "antd/es/input/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";

// import mockWeather from "./mockWeatherData.json";
const { Title, Text } = Typography;
const Weather = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [initial, setInitial] = useState([]);
  const [more, setMore] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [city, setCity] = useState("");
  const [openSub, setOpenSub] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openUnSub, setOpenUnSub] = useState(false);
  const [rightCityName, setRightCityName] = useState("");

  const handleOpenSub = () => {
    if (rightCityName && !errorMsg) setOpenSub(true);
  };
  const handleOpenConfirm = (value) => {
    setOpenSub(false);
    // send data to server here

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/subscription`, {
      email: value.email,
      city: rightCityName,
    });
    setOpenConfirm(true);
  };
  const handleOpenUnSub = () => {
    if (rightCityName && !errorMsg) setOpenUnSub(true);
  };
  const handeUnSub = (value) => {
    // send data to server here
    setOpenUnSub(false);
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/subscription`, {
      data: {
        email: value.email,
        city: rightCityName,
      },
    });
  };
  const handleCancel = () => {
    setOpenConfirm(false);
    setOpenSub(false);
    setOpenUnSub(false);
  };

  const handleSearch = (value) => {
    setCity(value);
  };
  const handleLoadMore = () => {
    setLoadMore(true);
  };
  // load data from cookie
  useEffect(() => {
    const saved = localStorage.getItem("weatherData");
    if (saved) {
      const weatherData = JSON.parse(saved);
      setErrorMsg("");
      const cityName = weatherData.data[0].location.split(",")[0];
      setRightCityName(cityName);
      setInitial(weatherData.data.slice(0, 4));
      setMore(weatherData.data.slice(4, 7));
    }
    // setInitial(mockWeather.slice(0, 4));
    // setMore(mockWeather.slice(4, 7));
    // console.log(initial, more);
  }, []);
  // fetch new data from server and set new cookie
  useEffect(() => {
    const getData = async () => {
      if (city) {
        try {
          const response = await axios.get(
            `${
              process.env.REACT_APP_BACKEND_URL
            }/weather?city=${encodeURIComponent(city)}`
          );
          if (response.data.status === "FAILED") {
            setErrorMsg(response.data.msg);
            setInitial([]);
            setMore([]);
            return;
          }
          setErrorMsg("");

          const cityName = response.data.data[0].location.split(",")[0];
          setRightCityName(cityName);

          setInitial(response.data.data.slice(0, 4));
          setMore(response.data.data.slice(4, 7));
          // Save weather data to localStorage
          localStorage.setItem("weatherData", JSON.stringify(response.data));
        } catch (error) {
          setErrorMsg("Error fetching data");
          setInitial([]);
          setMore([]);
        }
      }
    };
    getData();
  }, [city]);
  return (
    <>
      <FloatButton.Group>
        <FloatButton
          style={{
            right: 94,
            backgroundColor: "green",
            color: "white",
            borderColor: "green",
          }}
          tooltip="Subcribe to this city"
          shape="square"
          onClick={handleOpenSub}
          icon={<CheckOutlined />}
        />
        <FloatButton
          style={{
            right: 94,
            backgroundColor: "red",
            color: "white",
            borderColor: "red",
          }}
          tooltip="Unsubcribe from this city"
          shape="square"
          onClick={handleOpenUnSub}
          icon={<CloseOutlined />}
        />
      </FloatButton.Group>

      <Card
        bordered={true}
        style={{
          width: 550,
          margin: "0 auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {" "}
        <Search
          placeholder="Search city name here.."
          onSearch={(value) => handleSearch(value)}
        />
      </Card>

      {errorMsg && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Card
            title="Weather App"
            bordered={true}
            style={{
              width: 550,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Alert
              style={{ textAlign: "left" }}
              message={<b>Error while getting data</b>}
              showIcon
              description={
                <>
                  <ul>
                    <li>{errorMsg}</li>
                  </ul>
                </>
              }
              type="warning"
            />
          </Card>
        </div>
      )}
      {initial &&
        initial.map((day) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Card
              title={day.date}
              bordered={true}
              style={{
                width: 550,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <>
                <div
                  style={{
                    display: "flex",
                    flex: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "55px",
                      fontWeight: "bold",
                      marginTop: "18px",
                    }}
                  >
                    {day.temp} °C
                  </Text>
                  <img
                    src={day.condition.icon}
                    alt="Weather Icon"
                    style={{ width: "125px", height: "125px" }}
                  />
                </div>
                <Title level={4}>{day.location}</Title>
                <Text style={{ fontStyle: "italic" }}>
                  {day.condition.text}
                </Text>
              </>
            </Card>
            <Card
              title="Details"
              style={{
                width: 550,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <List
                grid={{
                  gutter: 16,
                  column: 2,
                }}
                dataSource={[
                  {
                    title: "Wind Speed km/h",
                    desc: `${day.wspeed} km/h`,
                  },
                  {
                    title: "Humidity %",
                    desc: `${day.humidity} %`,
                  },
                  {
                    title: "UV Index",
                    desc: `${day.uv}`,
                  },
                  {
                    title: "Visibility",
                    desc: `${day.vision} km`,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      style={{
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                      }}
                      title={item.title}
                    >
                      {item.desc}
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        ))}
      {loadMore &&
        more &&
        more.map((day) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Card
              title={day.date}
              bordered={true}
              style={{
                width: 550,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <>
                <div
                  style={{
                    display: "flex",
                    flex: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "55px",
                      fontWeight: "bold",
                      marginTop: "18px",
                    }}
                  >
                    {day.temp} °C
                  </Text>
                  <img
                    src={day.condition.icon}
                    alt="Weather Icon"
                    style={{ width: "125px", height: "125px" }}
                  />
                </div>
                <Title level={4}>{day.location}</Title>
                <Text style={{ fontStyle: "italic" }}>
                  {day.condition.text}
                </Text>
              </>
            </Card>
            <Card
              title="Details"
              style={{
                width: 550,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <List
                grid={{
                  gutter: 16,
                  column: 2,
                }}
                dataSource={[
                  {
                    title: "Wind Speed km/h",
                    desc: `${day.wspeed} km/h`,
                  },
                  {
                    title: "Humidity %",
                    desc: `${day.humidity} %`,
                  },
                  {
                    title: "UV Index",
                    desc: `${day.uv}`,
                  },
                  {
                    title: "Visibility",
                    desc: `${day.vision} km`,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      style={{
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                      }}
                      title={item.title}
                    >
                      {item.desc}
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        ))}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {initial.length !== 0 && (
          <Button
            type="primary"
            onClick={handleLoadMore}
            style={{ marginTop: "40px", marginBottom: "20px" }}
            disabled={loadMore}
          >
            Load More
          </Button>
        )}
      </div>
      {/* Model subcribe */}
      <Modal
        title={`Subcribe to ${rightCityName}`}
        open={openSub}
        onOk={handleCancel}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            marginTop: "50px",
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={handleOpenConfirm}
          autoComplete="off"
        >
          <Form.Item
            label="Enter email here"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="enter email" />
          </Form.Item>
          <Button
            style={{
              backgroundColor: "green",
              color: "white",
              borderColor: "green",
            }}
            htmlType="submit"
          >
            Subcribe
          </Button>
        </Form>
      </Modal>
      {/* Model unsubcribe */}
      <Modal
        title={`Unsubcribe from ${rightCityName}`}
        open={openUnSub}
        onOk={handleCancel}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            marginTop: "50px",
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={handeUnSub}
          autoComplete="off"
        >
          <Form.Item
            label="Enter email here"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="enter email" />
          </Form.Item>
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              borderColor: "red",
            }}
            htmlType="submit"
          >
            Unsubcribe
          </Button>
        </Form>
      </Modal>
      {/* Model confirm */}
      <Modal
        title={`Subcribe to ${rightCityName}`}
        open={openConfirm}
        onOk={handleCancel}
        footer={null}
        onCancel={handleCancel}
      >
        Check your email for confirmation link
      </Modal>
    </>
  );
};

export default Weather;
