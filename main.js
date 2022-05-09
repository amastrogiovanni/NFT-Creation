//Owned by Analia Mastrogiovanni. All rights reserved
//NFT creation, call smart contract and some simple functions
Moralis.initialize("eOANC9Ku7sLaPgrpLaK2UIZnjI6vkDomXeNEYowp");
Moralis.serverURL = "https://vylszl6jnq4x.usemoralis.com:2053/server";
const CONTRACT_ADDRESS = ""

//The following function will fetch image URL metadata from json file
function fetchNFTMetadata(NFTs){
    let promises = [];
    for (let i = 0; i < NFTs.length; i++) {
        let nft = NFTs[i];
        let id = nft.token_id;
        //Call Moralis Cloud function -? static json file
        promises.push(fetch("https://vylszl6jnq4x.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=eOANC9Ku7sLaPgrpLaK2UIZnjI6vkDomXeNEYowp&nftId=" + id)
        .then(res => res.json())
        .then(res => JSON.parse(res.result))
        .then(res => {nft.metadata = res}))
        .then(res => {
          const options = { address:"0xff3B5D6BD12079D6e4c6608Aa592F0b9283A8458", token_id: "1", chain:"rinkeby"};
          return Moralis.Web3API.token.getTokenIdOwners(options)
        })
        .then( () => {return nft;})
    }
    //Wait for all promises in the array to be complete and sends back the results
    return Promise.all(promises);
} 

//function that calls metadata and puts it on the screen
function renderInventory(NFTs){
    const parent = document.getElementById("app");
    for (let i = 0; i < NFTs.length; i++) {
        const nft = NFTs[i];
        let htmlString = `<div class="card">
        <img src="${nft.metadata.image}" class="card-img-top" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${nft.metadata.name}</h5>
          <p class="card-text">${nft.metadata.description}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`
      let col = document.createElement("div");
      col.className = "col col-md-4"
      col.innerHTML = htmlString;
      parent.appendChild(col);
    }
}

// async function to initialize the app
async function initializeApp(){
    let currentUser = Moralis.User.current();
    if(!currentUser){
        //If current user doesn't exist, then sign in
        current = await Moralis.Web3.authenticate();
    }
    const options = {
        address: "0xff3B5D6BD12079D6e4c6608Aa592F0b9283A8458",
        chain: "rinkeby",
      };
    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
    renderInventory(NFTWithMetadata);
}

initializeApp();
