import './index.css'

import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamList} = props
  const {name, id, teamImageUrl} = teamList
  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="team-card">
        <img className="team-card-image" src={teamImageUrl} alt={`${name}`} />
        <p className="team-card-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
