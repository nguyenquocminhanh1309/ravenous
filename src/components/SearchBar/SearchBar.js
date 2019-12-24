import React from 'react';
import './SearchBar.css';
import Autocomplete from 'react-google-autocomplete';

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
        this.handleEnter = this.handleEnter.bind(this);
        this.handlePlaceSelected = this.handlePlaceSelected.bind(this);

        this.sortByOptions = {                             // keys is returned event object of event handler
            'Best Match' : 'best_match',
            'Highest Rate' : 'rating',
            'Most Reviewed' : 'review_count',
            'Nearest To Farest' : 'distance'
        }
    }

    //handle sorting By Change
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption) {             // using returned event object to update state sortBy
        this.setState({
            sortBy : sortByOption,
        })
    }
    
    // this method will get called before component is rendered from 2nd time
    // and run searchYelp only when there is update in state and state.location & term != ''
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if(this.state.sortBy !== nextState.sortBy && this.state.location !== '' && this.state.term !== ''){
            this.props.searchYelp(nextState.term, nextState.location, nextState.sortBy);
        } else {
            return true;
        }
    }

    handleTermChange(event) {
        this.setState({
            term: event.target.value,
        })
    }

    //handle Location change
 
    handleLocationChange(event) {
        // console.log(event);
        this.setState({
            location: event.target.value,
        })
    }

    handleSeach(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    handlePlaceSelected(place) {
        this.setState({
            location: place.formatted_address,
        })
    }

    handleEnter(e) {
        if(e.key === 'Enter'){
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        }
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
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleEnter}/>
                    {/* <input placeholder="Where?" onChange={this.handleLocationChange} onKeyPress={this.handleEnter}/> */}
                    <Autocomplete 
                        onChange={this.handleLocationChange} 
                        onPlaceSelected={this.handlePlaceSelected} 
                        style={{width: '25%'}}                       
                        // onPlaceSelected={(place) => {
                        //     console.log(place);
                        // }}
                        types={['(cities)']}
                        
                        // componentRestrictions={{country: "us"}}
                    />
                </div>
                <div className="SearchBar-submit" onClick={this.handleSeach}>
                    <a href="/#">Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar