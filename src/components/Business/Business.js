import React from 'react';
import './Business.css'

const styles = {
    cursor: "pointer",
    fontWeight: "bold",
}

// Test GitHub: try to push branch to GitHub
class Business extends React.Component {

    handleClick(name, address) {
        let newName = name.split(' ').join("+");
        window.open('https://www.google.com/maps/search/?api=1&query=' + newName + '+' + address, '_blank')
    }

    handleClickImage(url) {
        window.open(url, '_blank')
    }
    render() {   
        return (
            <div className="Business">
                <div className="image-container">
                    <img src={this.props.business.imageSrc} alt='' style={{cursor: styles.cursor}} onClick={this.handleClickImage.bind(this, this.props.business.url)}/>
                </div>
                <h2>{this.props.business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        
                        <p onClick={this.handleClick.bind(this, this.props.business.name, this.props.business.address)} style={styles}>{this.props.business.address}</p>
                        <p>{this.props.business.city}, {this.props.business.zipcode}</p>
                        <p>Distance: {Math.round(this.props.business.distance)}m</p>
                        <p>{this.props.business.state} {this.props.business.zipcode}</p>

                    </div>
                    <div className="Business-reviews">
                        <h3>{this.props.business.category}</h3>
                        <h3 className="rating">{this.props.business.rating} stars</h3>
                        <p>{this.props.business.reviewCount} reviews</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Business;
