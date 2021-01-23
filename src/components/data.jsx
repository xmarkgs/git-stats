import { React, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faLink, faUserFriends, faStar } from '@fortawesome/free-solid-svg-icons';

class Data extends Component {
    state = {
        showMore: false
    }

    showMoreRepos = () => {
        let { showMore } = this.state;
        this.setState({
            showMore: !showMore,
        });
    }

    render() {
        let reposClass;
        this.state.showMore ? reposClass = "account-repos-row openedRepos" : reposClass = "account-repos-row";
        let { result: { name, login, location, company, bio, created_at, avatar_url, html_url, blog, public_repos, followers, following }, repos, starred } = this.props;
        return (
            <div className="dataContainer">
                <div className="user-media">
                    <div className="user-avatar">
                        <img src={avatar_url} alt="" />
                    </div>
                    <div className="user-media-stats">
                        <span><span><FontAwesomeIcon icon={faUserFriends} /> {followers}</span> followers</span>
                        <span><span>{following}</span> following</span>
                        <span><span><FontAwesomeIcon icon={faStar} /> {starred.length}</span> stars</span>
                    </div>
                </div>
                <div className="user-info">
                    <div className="account-info-row">
                        <a href={html_url} className="username">{name ? name : login}</a>
                        <h3 className="nickname">{`users/${login}`}</h3>
                        <p className="bio">{bio}</p>
                        {company || blog || location ? <div className="additional-info">
                            <span><FontAwesomeIcon icon={faBuilding} /> {company} </span>
                            <br />
                            <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {location} </span>
                            <br />
                            <span><FontAwesomeIcon icon={faLink} /> {blog}</span>
                        </div> : null}
                        <p className="account-creation-date">{`Account created at: ${new Date(created_at).toUTCString()}`}</p>
                    </div>
                    <div class={reposClass}>
                        <a href={`https://github.com/${login}?tab=repositories`}><span>Public repos</span>: {public_repos}</a>
                        {repos.map(({ name, fork, updated_at, language, description, html_url }) => (
                            <div className="repo" key={updated_at}>
                                <div>
                                    <a href={html_url} className="repo-name">{name}<span>{fork === true ? `fork` : ``}</span></a>
                                    <p className="repo-desc">{description}</p>
                                </div>
                                <div className="repo-data">
                                    <p>{`${new Date(updated_at).toLocaleDateString()} ${new Date(updated_at).toLocaleTimeString()}`}</p>
                                    <h4>{language === 'JavaScript' ? `JS` : language}</h4>
                                </div>
                            </div>
                        ))}
                        {repos.length > 3 ? <a href="#" className="find-more-link" onClick={this.showMoreRepos}>{this.state.showMore ? 'Show Less' : 'Show More'}</a> : null }
                    </div>
                </div>
            </div>
        )
    }
}

export default Data;