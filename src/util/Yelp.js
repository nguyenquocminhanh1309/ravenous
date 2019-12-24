const apiKey = 'TjSzfnVCqjCNV9lM4L9_-kpFWTnjvyq-h0zKfzZO44S1h70zMZaD58QU0QR-1SNCQ5O3QRFlO3QI3umcfMN-Nwl2MA6mPIUVMjtbXKvltmyWh9IH7j9ieoc92F75XXYx';
const Yelp = {
    search(term, location, sortBy) {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {headers: 
                {Authorization: `Bearer ${apiKey}`}
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipcode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        alias: business.alias,
                        url: business.url,
                        distance: business.distance
                    }
                });
            }
        })
    }
};
export default Yelp;
