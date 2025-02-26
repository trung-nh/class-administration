import { IsArray, IsEmail } from 'class-validator';

export class RetrieveNotificationsResponseDto {
  @IsArray()
  @IsEmail({}, { each: true })
  recipients: string[];
}