import PropTypes from 'prop-types';
import { Link } from 'components/Link';
import { Image } from 'components/Image';
import { RecipeMeta } from 'components/RecipeMeta';
import { animations, colors, fonts } from '../styles';

const RecipeCard = ({ recipe: { title, slug, skill, totalTime, image } }) => (
  <Link route="recipe" params={{ slug }}>
    <a className="l-w33" title={title}>
      <article>
        <Image
          src={image}
          alt={title}
          className="recipeCard__image"
          width="100%"
          height="100%"
          cover
        />
        <div>
          <h3>{title}</h3>
          <RecipeMeta totalTime={totalTime} skill={skill} light />
        </div>
      </article>

      <style jsx>{`
        a {
          float: left;
        }

        article {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 12rem;
          margin-top: 0.5rem;
          padding: 1rem;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
          overflow: hidden;

          &::after {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 8px;
            background: linear-gradient(
              180deg,
              transparent,
              rgba(0, 0, 0, 0.15) 50%,
              rgba(0, 0, 0, 0.5)
            );
            content: '';
          }
        }

        div {
          position: absolute;
          bottom: 1rem;
          z-index: 99;
        }

        h3 {
          font-size: ${fonts.size.t2};
          margin-bottom: 0.25rem;
          transition: color ${animations.medium};
          color: ${colors.white};
          font-weight: ${fonts.weight.bold};
        }
      `}</style>
    </a>
  </Link>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    totalTime: PropTypes.string,
    skill: PropTypes.string,
    image: PropTypes.string
  })
};

export { RecipeCard };