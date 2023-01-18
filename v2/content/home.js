import ticketToRideInPlay from '../assets/homepage/ticket-to-ride-in-play.jpg';
import concordiaInPlay from '../assets/homepage/concordia-in-play.jpg';
import fistBump from '../assets/homepage/fist-bump.jpg';
import friendsAroundTable from '../assets/homepage/friends-around-table.jpg';
import handsUp from '../assets/homepage/hands-up.jpg';
import smileyLadiesAtComputer from '../assets/homepage/smiley-ladies-at-computer.jpg';

const home = {
  data: [
    {
      title: {
        type: 'h1',
        text: 'GameVentory',
      },
      tagline: 'The board game social network',
      description: 'Come together with your friends over a shared passion for board games.',
      image: ticketToRideInPlay,
      alt: 'Trains laid out on the Ticket to Ride map',
      /* todo: cta */
    },
    {
      title: {
        type: 'h2',
        text: 'Track Your Games',
      },
      description: 'Understanding your collection and those in your network ',
      image: concordiaInPlay,
      alt: 'Playing a game of Concordia, with pieces and cards laid out on the table, and people sitting around it',
      /* todo: cta */
    },
    { 
      title: {
        type: 'h2',
        text: 'Connect With Your Friends',
      },
      description: 'Build a network of people you enjoy playing with',
      image: friendsAroundTable,
      alt: 'People sitting and socializing around a wooden table',
    },
    {
      title: {
        type: 'h2',
        text: 'Organize a Game Night',
      },
      description: 'Invite friends you know and trust',
      image: smileyLadiesAtComputer,
      alt: 'Two women are smiling over a computer',
    },
    {
      title: {
        type: 'h2',
        text: 'Remove the Guesswork',
      },
      description: 'Propose the games for your next outing',
      image: fistBump,
      alt: 'Fist bump',
    },
    {
      title: {
        type: 'h2',
        text: 'Democratize Fun',
      },
      description: 'Let your friends vote on what games to play next',
      image: handsUp,
      alt: 'People raising their hands up in the air',
    }
  ],
};

export default home;