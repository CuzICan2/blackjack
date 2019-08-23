//Can I reuse this from RoboFriends for BlackJack? React?

import React from 'react'; 
import Card from './Card'; 

const CardList = ({ robots }) => {
	// if (true) { //To try out the ErrorBoundry component
	// 	throw new Error('Nooooooo');
	// }
	return (
		<div>
			{
				robots.map((user, i) => {
				return (
					<Card 
						key={i} 
						id={robots[i].id} 
						name={robots[i].name} 
						email={robots[i].email}
					/>
				)
			}
		)}
		</div>
	);
}

export default CardList; 