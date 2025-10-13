function calculatePlayerPoints(playerStats){
    const {
        runs = 0,
        fours = 0,
        sixes = 0,
        wickets = 0,
        overs = 0,
        runs_given = 0,
        catches = 0,
        run_outs = 0,
        stumpings = 0
    } = playerStats;

    let points = 0;

    //batting
    points += runs * 1;
    points += fours * 1;
    points += sixes * 2;

    //bowling
    points += wickets * 25;
    if(overs && runs_given){
        const economy = runs_given/overs;
        if(economy < 4){
            points += 10;
        }
        else if(economy > 8){
            points -= 5;
        }
    }

    //fielding
    points += catches * 10;
    points += run_outs * 10;
    points += stumpings * 10;

    return points;
}

module.exports = calculatePlayerPoints;