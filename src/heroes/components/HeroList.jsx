import { HeroCard } from './HeroCard';
import { getHeroByPublisher } from '../helpers';
import { useMemo } from 'react';

export const HeroList = ({ publisher }) => {
	const heroes = useMemo(() => getHeroByPublisher(publisher), [publisher]);
	return (
		<div className='row row-cols-1 row-cols-3 g-3'>
			{heroes.map(heroe => (
				<HeroCard key={heroe.id} {...heroe} />
			))}
		</div>
	);
};
