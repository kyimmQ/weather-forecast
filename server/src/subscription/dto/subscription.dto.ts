import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionDTO {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;
}
