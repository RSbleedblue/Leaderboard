const players = []   
function feedData(){
    const newPlayer = document.getElementById("playerName").value;
    const playerScore = parseFloat(document.getElementById("scorePlayer").value);
    const league = findLeague(playerScore);
    if(league){
        const player = { name : newPlayer, score : playerScore, rank:league};
        players.push(player);
        console.log(player);
        addToLeaderboard();
    }
    else{
        return;
    }
}
function findLeague(score){
    if(score <= 500){
        return "silver";
    }
    else if(score > 500 && score <=1500){
        return "gold";
    }
    else if(score > 1500 && score<=2500){
        return "diamond";
    }
    else if(score > 2500 && score <= 10000){
        return "legend";
    }
    else{
        false;
    }
}
function addScore(playerName) {
    const points = 5;
    const player = players.find(player => player.name.toLowerCase() === playerName.toLowerCase());
    if (player) {
        player.score += points;
        console.log(players)
        addToLeaderboard();
    } else {
        alert("Player not found!");
    }
}

function deleteScore(playerName) {
    const points = 5; 
    const player = players.find(player => player.name.toLowerCase() === playerName.toLowerCase());
    if (player) {
        player.score -= points;
        if (player.score < 0) {
            player.score = 0;
        }
        addToLeaderboard();
    } else {
        alert("Player not found!");
    }
}

function addToLeaderboard(){
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = '';
    players.sort((a, b) => {
        const rankOrder = { "silver": 1, "gold": 2, "diamond": 3, "legend": 4 };
        return rankOrder[b.rank] - rankOrder[a.rank];
    });

    players.sort((a, b) => {
        if (a.rank === b.rank) {
            return b.score - a.score; 
        }
        return 0;
    });
    players.forEach(player => {
        const tr = document.createElement("tr");
        tr.classList.add("shadow-lg");
        tr.innerHTML = `
        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <img class="w-10 h-10 rounded-full shadow-lg" src="assets/${player.rank}.png" alt="Jese image">
        <div class="ps-3">
            <div class=" font-semibold">${player.name}</div>
        </div>  
    </th>
    <td class="px-6 py-4">
        ${player.rank.toUpperCase()}
    </td>
    <td class="px-6 py-4 ">
        <div class="flex items-center">
            ${player.score}
        </div>
    </td>
    <td class="px-6 py-4 flex flex-row items-center">
        <button class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onclick = deleteScore('${player.name}')>
            <span class="sr-only">Quantity button</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
        </button>
        <button class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onclick = addScore('${player.name}')>
            <span class="sr-only">Quantity button</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>    
    </td>  
        
        
        `
        tbody.appendChild(tr);

    })
}
addToLeaderboard();
feedData();
