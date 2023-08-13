import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class tokenDto {
	@ApiProperty({
		description: "token",
		example: "000000"
	})
	@IsString()
  @IsNotEmpty()
	token: string;
}