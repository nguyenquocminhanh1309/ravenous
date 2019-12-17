import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term : '',
            location : '',
            sortBy : 'best_match'  
        };

        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSeach = this.handleSeach.bind(this);

        this.sortByOptions = {                             // keys is returned event object of event handler
            'Best Match' : 'best_match',
            'Highest Rate' : 'rating',
            'Most Reviewed' : 'review_count'
        }
    }

    //handle sorting By Change

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption) {                      // using returned event object to update state sortBy
        this.setState({
            sortBy : sortByOption,
        })
    }

    //handle Terms(Business) change

    handleTermChange(event) {
        this.setState({
            term: event.target.value,
        })
    }

    //handle Location change
 
    handleLocationChange(event) {
        this.setState({
            location: event.target.value,
        })
    }

    handleSeach(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    //render

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];          
            return <li className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this,sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
        });
    };
    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
                    <input placeholder="Where?" onChange={this.handleLocationChange}/>
                </div>
                <div className="SearchBar-submit" onClick={this.handleSeach}>
                    <a href="">Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar