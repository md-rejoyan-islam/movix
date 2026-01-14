import { TokensResponseDto } from './tokens-response.dto';
import { UserResponseDto } from './user-response.dto';

export class AuthResponseDto {
  user: UserResponseDto;
  tokens: TokensResponseDto;
}
