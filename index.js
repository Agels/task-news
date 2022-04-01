// 171f08d6d2234a0480c7e4708d6e0eb6 : api 1
//5576511f5d8a4fbfa6f186306439f6e5 : api 2
//dbf82ff4b52d4ee39ea3e66623f033c8 : api 3
// 3964c57788ee4edcad4038d6bc318c18 : api 4
// a876816f98574cdfa23ffdc7d531c7bc : api 5

const api_key = "a876816f98574cdfa23ffdc7d531c7bc";

const showFirst = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=id&apiKey=${api_key}`
  );
  const result = await res.json();
  const data = await result.articles;
  showNews(data);
};

showFirst();

const loading = () => {
  document.getElementById("load").classList.add("loading");
};
const hideLoad = () => {
  document.getElementById("load").classList.remove("loading");
};

const search = document.getElementById("search");
search.addEventListener("keyup", async () => {
  const words = event.target.value;
  try {
    loading();
    const res = await fetch(
      `https:newsapi.org/v2/everything?q=${words}&popularity=popularity&language=id&apiKey=${api_key}`
    );

    const result = await res.json();
    const data = await result.articles;
    hideLoad();
    if (!data) {
      showFirst();
    }

    showNews(data);
  } catch (error) {
    document.getElementById("content").innerHTML = error.message;
  }
});

const showNews = (data) => {
  const container = document.getElementById("content");
  let datax = "";
  console.log(data);

  try {
    if (data.length === 0) {
      datax = '<p class="text-center fs-3">Not found</p>';
    }

    let count = 0;
    data.map((news) => {
      let col = count === 0 ? "col-lg-8" : "col-lg-4";

      datax += `<div class="card ${col} border-0">
                <img src="${news.urlToImage}" class="card-img-top" alt="image">
               <div class="card-body">
                   <h5 class="card-title">${news.title}</h5>
                   <h6 class="title">${news.author} </h6>
                   <p class="card-text fs-6">${news.description} ....<a href=${news.url}> <em>read more</em><a></p>
               </div>
           </div>`;

      count++;
    });
  } catch {}
  container.innerHTML = datax;
};
