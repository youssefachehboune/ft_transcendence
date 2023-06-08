import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class tokenDto {
	@ApiProperty({
		description: "token",
		example: "000000"
	})
	@IsString()
	token: string;
}