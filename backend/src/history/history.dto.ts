import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class historyDto {
	@ApiProperty({
		description: 'the username of the oppenent player',
		example: 'johndoe'
	})
	@IsString()
	username: string;

	@ApiProperty({
		description: 'the points that the user has scored',
		example: 10
	})
	@IsInt()
	userPoints: number

	@ApiProperty({
		description: 'the points that the oppenent player has scored',
		example: 8
	})
	@IsInt()
	opponentPoints: number
}