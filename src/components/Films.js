import React from 'react';
import FilmComponent from './FilmComponent';

    const Films = ({data}) => {
        const filmList = data.map((film, i) => {
          return (
            <FilmComponent
              key={film.url}
              episode_id={film.episode_id}
              title={film.title}
              release_date={film.release_date}
              director={film.director}
              producer={film.producer}
              characters={film.characters}
              starships={film.starships}
            />
          )}
        )
        return (
          <section>
            {filmList}
          </section>
        );
      }   

export default Films;