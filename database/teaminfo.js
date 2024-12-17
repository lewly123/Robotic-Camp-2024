import { db } from './database.js';
import { fetchTeamsData, fetchTeamInfo } from "./function.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log(fetchTeamsData(db));
    console.log(fetchTeamInfo(db, "team1"));
})