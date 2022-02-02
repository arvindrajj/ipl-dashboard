import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

/* 
  use value of the key 'competing_team' for alt as `latest match ${competing_team}`
  use value of the key 'competing_team' for alt as `competing team ${competing_team}`
*/

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: {},
    recentMatchList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.fetchTeamMatchesList()
  }

  fetchTeamMatchesList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const {latestMatchDetails, recentMatches} = formattedData
    const formattedLatestMatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }
    const formattedRecentMatches = recentMatches.map(each => ({
      umpires: each.umpires,
      result: each.result,
      manOfTheMatch: each.man_of_the_match,
      id: each.id,
      date: each.date,
      venue: each.venue,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      matchStatus: each.match_status,
    }))
    this.setState({
      teamBannerUrl: formattedData.teamBannerUrl,
      latestMatch: formattedLatestMatchDetails,
      recentMatchList: formattedRecentMatches,
      isLoading: false,
    })
  }

  render() {
    const {teamBannerUrl, latestMatch, recentMatchList, isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(latestMatch)
    console.log(recentMatchList)

    return (
      <div className={`app-team-matches-container ${id}`}>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch key={latestMatch.id} latestMatch={latestMatch} />
            <ul className="recent-matches-list">
              {recentMatchList.map(each => (
                <MatchCard key={each.id} matchData={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
