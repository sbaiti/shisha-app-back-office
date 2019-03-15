import React from 'react';
import './Hauptseite.css';

class YesDataUsers extends React.Component {
    render() {
        return (
            <div className="user">
                <div className="YesDataResrvation__tab">
                    <div className="item__user__home">
                        NAME Benutzer
                </div>
                </div>
                <div className="ctn__res">
                    {this.props.data.map((user, key) =>
                        <div className="YesDataResrvation"
                            key={key}>
                            <div className="item__user__home">
                                {user.Name}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        )
    }
}

export default YesDataUsers;