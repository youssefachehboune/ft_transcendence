import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class achievementDto {
	@ApiProperty({
		description: 'the name of the achievement',
		example: 'Fastest Victory'
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Reset the achievement score to 0',
		example: false
	})
	@IsBoolean()
	@IsOptional()
	reset: boolean
}