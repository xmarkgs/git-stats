import { React } from 'react';

const Data = ({ result: { name, login, location, company, bio, created_at, avatar_url, html_url, blog, public_repos, followers, following } }) => {
    return (
        <div className="dataContainer">
            <div className="user-media">
                <div className="user-avatar">
                    <img src={avatar_url} alt="" />
                </div>
                <div className="user-media-stats">
                    <span><span>{followers}</span> followers</span>
                    <span><span>{following}</span> following</span>
                    <span><span>{`9`}</span> stars</span>
                </div>
            </div>
            <div className="user-info">
                <div className="account-info-row">
                    <a href={html_url} className="username">{name}</a>
                    <h3 className="nickname">{`users/${login}`}</h3>
                    <p className="bio">{bio}</p>
                    <div className="additional-info">
                        <span>[]{company} </span>
                        <span>[]{location} </span>
                        <span>[]{blog}</span>
                    </div>
                    <p className="account-creation-date">{`Account created at: ${created_at}`}</p>
                </div>
                <div className="account-repos-row">
                    <a href={`https://github.com/${login}?tab=repositories`}><span>Public repos</span>: {public_repos}</a>
                    <div className="repo">
                        <div>
                            <a href="/" className="repo-name">{`git-stats`}<span>{`fork`}</span></a>
                            <p className="repo-desc">Lorem</p>
                        </div>
                        <div className="repo-data">
                            <p>{`Last updated 10 years ago`}</p>
                            <h4>{`JS`}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data;