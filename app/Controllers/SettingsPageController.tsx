import qs from 'qs';

const homePageQuery = qs.stringify({ 
    populate:{
        blocks:{
            on:{
                "layout.hero-section":{
                    populate:{
                image: {
                    fields: ["url", "alternativeText"]
                },
                link: {
                        populate: true,
                    },
                },
            },
        },
    }
},
});

export async function getStrapiData(url: string) {
    const baseUrl = "http://localhost:1337/";
    const queryUrl = new URL(baseUrl + url);
    queryUrl.search = homePageQuery;
    try {
      const res = await fetch(queryUrl.href, {cache: "no-store"});
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }