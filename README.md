shoppersapi-js-sampleguide
==========================

Sample JS/jQuery Page to Demonstrate Digital River Shoppers API Interaction

This is a basic html/js project intended to demonstrate how you can call the Digital River Shoppers API in the browser to support a shopping experience. It will also display the API call performed for reference.

I am using local browser storage to store settings for the sample guide (apiKey, SiteID, accessToken).

Storing anonymous tokens in browser storage isn't too terrible, but the practice should be avoided for sites in production for security reasons. This is more important if you begin using authenticated shopping.

Instructions:
Just put both of these into the same directory and point your browser at apiexamples.html

Next steps:
* Make it prettier
* Display Key and SiteID if already present in memory to avoid confusion
* Make number of products (and images) returned configurable
* Category view

