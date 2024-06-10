import { version } from 'react';
import Companies from './Companies';
import Jobcards from './HomeJobcards';
import Nextlevel from './Nextlevel';
import Startbuilding from './Startbuilding';

console.log(version);

const Main = () => {
  return (
    <div>
      <Startbuilding/>
      <Companies/>
      <Jobcards/>
      <Nextlevel/>
    </div>
  )
}

export default Main

