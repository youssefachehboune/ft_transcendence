import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class historyDto {
	@ApiProperty({
		description: 'the username of the oppenent player',
		example: 'johndoe'
	})
	@IsString()
	username: string;

	@ApiProperty({
		description: 'the points that the user has scored',
		example: '10'
	})
	@IsString()
	userPoints: string

	@ApiProperty({
		description: 'the points that the oppenent player has scored',
		example: '8'
	})
	@IsString()
	opponentPoints: string
}