import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class AddWishlistDto {
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  poster_path: string;

  @IsNumber()
  @IsNotEmpty()
  vote_average: number;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsEnum(['movie', 'tv'])
  @IsNotEmpty()
  type: 'movie' | 'tv';
}
