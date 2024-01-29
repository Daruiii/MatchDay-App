import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllSlugs, getTeamLogo } from '../hooks/getAllSlugs';

const defaultTeams = [
    {
        image_url: "https://cdn.pandascore.co/images/team/image/134078/karmine_corplogo_square.png",
        backgroundColor: "#131b2b",
        eventColor: "#29365b", //1c243d
        eventTextColor: "#ffffff",
        secondColor: "#05cafc",
        teamName: "karmine",
        displayedName: "Karmine Corp",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/115/team_vitalitylogo_square.png",
        backgroundColor: "#000000",
        eventColor: "#fae100a3",
        eventTextColor: "#221c35",
        secondColor: "#fae100",
        teamName: "vitality",
        displayedName: "Vitality",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3212/FAZE_CLAN.png",
        backgroundColor: "#000000",
        eventColor: "#e23b2f",
        eventTextColor: "#070707",
        secondColor: "#999999",
        teamName: "faze",
        displayedName: "Faze Clan",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/1647/527px_team_liquid_2023_lightmode.png",
        backgroundColor: "#042528",
        eventColor: "#135082",
        eventTextColor: "#ffffff",
        secondColor: "#5c89f9",
        teamName: "team-liquid",
        displayedName: "Team Liquid",
        slugs: [
            "team-liquid-challengers",
            "team-liquyid",
            "team-liquid-first",
            "team-liquid-brazil",
            "team-liquid-valorant",
            "team-liquid-r6-siege",
            "liquid-cs-go",
            "liquid-academy",
            "team-liquid",
            "liquid",],
        country: "NL"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/133115/gentle_mates_allmode.png",
        backgroundColor: "#3c3c3c",
        eventColor: "#b3ff30",
        eventTextColor: "#131313",
        secondColor: "#ff1886",
        teamName: "gentle-mates",
        displayedName: "Gentle Mates",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/128267/team_bd_slogo_square.png",
        backgroundColor: "#cae0e5",
        eventColor: "#ffffffc7",
        eventTextColor: "#22577a",
        secondColor: "#ff0075",
        teamName: "bds",
        displayedName: "BDS",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3210/5995.png",
        backgroundColor: "#a5a5a5",
        eventColor: "#e9e3ed",
        eventTextColor: "#000000",
        secondColor: "#EE3D23",
        teamName: "g2",
        displayedName: "G2",
        country: "DE"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130338/900px_loud_allmode.png",
        backgroundColor: "#000000",
        eventColor: "#399e35",
        eventTextColor: "#000000",
        secondColor: "#13ff00",
        teamName: "loud",
        displayedName: "LOUD",
        slugs: [
            "loud-female",
            "loud-valorant",
            "loud-academy",
            "loud"],
        country: "BR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/394/220px_fnaticlogo_square.png",
        backgroundColor: "#000000",
        eventColor: "#eaa081",
        eventTextColor: "#000000",
        secondColor: "#FF5900",
        teamName: "fnatic",
        displayedName: "Fnatic",
        country: "GB"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/125697/_.png",
        backgroundColor: "#000000",
        eventColor: "#ccc816",
        eventTextColor: "#000000",
        secondColor: "#A58721",
        teamName: "gen-g",
        displayedName: "Gen.G",
        country: "KR",
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png",
        backgroundColor: "#d3d3d3",
        eventColor: "#00DEEF",
        eventTextColor: "#000000",
        secondColor: "#00AEEF",
        teamName: "cloud9",
        displayedName: "Cloud9",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3310/600px_complexity_gaming_2019.png",
        backgroundColor: "#cecece",
        eventColor: "#2f496b",
        eventTextColor: "#ffffff",
        secondColor: "#002B5D",
        teamName: "complexity",
        displayedName: "Complexity",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/129355/57px_natus_vincere_2021_lightmode.png",
        backgroundColor: "#000000",
        eventColor: "#fff200",
        eventTextColor: "#000000",
        secondColor: "#fff200",
        teamName: "natus-vincere",
        displayedName: "Natus Vincere",
        country: "UA"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/126061/t_oscq04.png",
        backgroundColor: "#000000",
        eventColor: "#ff8c8c",
        eventTextColor: "#000000",
        secondColor: "#e2012d",
        teamName: "t1",
        displayedName: "T1",
        slugs: [
            "t1-academy"
            , "t1-lol-wild-rift"
            , "t1-r6-siege"
            , "t1-valorant"
            , "t1-challengers"
            , "t1-dota-2"
            , "t1"
            , "sk-telecom-t1"
            , "sktelecom-t1"
        ],
        country: "KR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/1449/123px_solarylogo_square.png",
        backgroundColor: "#101219",
        eventColor: "#2f354a",
        eventTextColor: "#fff",
        secondColor: "#00aeff",
        teamName: "solary",
        displayedName: "Solary",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/131000/team_g_ologo_square.png",
        backgroundColor: "#1d2c66",
        eventColor: "#1a6cb6",
        eventTextColor: "#ffffff",
        secondColor: "#eb0045",
        teamName: "team-go",
        displayedName: "Team GO",
        slugs: [
            "team-go"
            , "team-go-rl"
        ],
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/132417/team_du_sudlogo_square.png",
        backgroundColor: "#2f3f5a",
        eventColor: "#262626",
        eventTextColor: "#ffffff",
        secondColor: "#389dd3",
        teamName: "team-du-sud",
        displayedName: "TDS",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130451/223px_mandatory_2022_allmode.png",
        backgroundColor: "#1c1c1c",
        eventColor: "#23252c",
        eventTextColor: "#ffffff",
        secondColor: "#e04747",
        teamName: "mandatory",
        displayedName: "Mandatory",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/131616/185px_zerance_allmode.png",
        backgroundColor: "#f8e3db",
        eventColor: "#e48550",
        eventTextColor: "#ffffff",
        secondColor: "#d56400",
        teamName: "zerance",
        displayedName: "Zerance",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/132529/aegis__2528_french_team_2529logo_profile.png",
        backgroundColor: "#42351e",
        eventColor: "#fdf3d1",
        eventTextColor: "#000000",
        secondColor: "#ca952a",
        teamName: "aegis",
        displayedName: "Aegis",
        slugs: [
            "aegis"
        ],
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130384/joblifelogo_square.png",
        backgroundColor: "#042151",
        eventColor: "#0b469d",
        eventTextColor: "#ffffff",
        secondColor: "#ea135a",
        teamName: "joblife",
        displayedName: "Joblife",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/133908/v4_ilh_om5_400x400.png",
        backgroundColor: "#000000",
        eventColor: "#232323",
        eventTextColor: "#ffffff",
        secondColor: "#b6a14b",
        teamName: "dvm-esport",
        displayedName: "DVM Esport",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130412/movistar_ko_ilogo_square.png",
        backgroundColor: "#441743",
        eventColor: "#5f5084",
        eventTextColor: "#ffffff",
        secondColor: "#6339c2",
        teamName: "koi",
        displayedName: "Movistar KOI",
        country: "ES"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/2876/220px_evil_geniuses_2020logo_square.png",
        backgroundColor: "#3b3142",
        eventColor: "#909beb",
        eventTextColor: "#000000",
        secondColor: "#efdcd5",
        teamName: "evil-geniuses",
        displayedName: "Evil Geniuses",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3250/600px_mibr_2018.png",
        backgroundColor: "#ffffff",
        eventColor: "#23507f",
        eventTextColor: "#ffffff",
        secondColor: "#e7b04c",
        teamName: "mibr",
        displayedName: "Made in Brazil",
        country: "BR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3256/1200px_nrg_2020_lightmode.png",
        backgroundColor: "#2d2c2e",
        eventColor: "#dedede",
        eventTextColor: "#000000",
        secondColor: "#dedede",
        teamName: "nrg",
        displayedName: "NRG",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/37/misfits-8fnvxt30.png",
        backgroundColor: "#f2413c",
        eventColor: "#f9d4d3",
        eventTextColor: "#000000",
        secondColor: "#ffffff",
        teamName: "misfits",
        displayedName: "Misfits",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/1385/optic.png",
        backgroundColor: "#fefefe",
        eventColor: "#285330",
        eventTextColor: "#000000",
        secondColor: "#39e941",
        teamName: "optic-gaming",
        displayedName: "OpTic Gaming",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/1537/100_thieves_alternatelogo_square.png",
        backgroundColor: "#2c2c2e",
        eventColor: "#ffffff",
        eventTextColor: "#000000",
        secondColor: "#df131f",
        teamName: "100-thieves",
        displayedName: "100 Thieves",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/125726/thumb_270_c76105c71585ceb2ed72c37c03b54c38.png",
        backgroundColor: "#35262c",
        eventColor: "#cdcbbc",
        eventTextColor: "#000000",
        secondColor: "#b71231",
        teamName: "team-solomid",
        displayedName: "Team SoloMid",
        slugs: [
            "tsm-challengers",
            "tsm-x",
            "tsm-lol-wild-rift",
            "tsm-academy-valorant",
            "tsm-valorant",
            "tsm-academy",
            "tsm",
            "team-solomid",
            "team-solomid-r6-siege",
            "team-solomid-rl",
        ],
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/1568/fun_plus_phoenixlogo_square.png",
        backgroundColor: "#2f292a",
        eventColor: "#8c231d",
        eventTextColor: "#ffffff",
        secondColor: "#cf3f26",
        teamName: "funplus-phoenix",
        displayedName: "FunPlus Phoenix",
        country: "CN"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/129766/190px_jd_gaming_2021_teamcard_allmode.png",
        backgroundColor: "#e6e6e6",
        eventColor: "#f2f2f2",
        eventTextColor: "#000000",
        secondColor: "#d21f29",
        teamName: "jd-gaming",
        displayedName: "JD Gaming",
        slugs: [
            "jd-gaming",
            "qg-reapers",
        ],
        country: "CN"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/126125/team-weibo.png",
        backgroundColor: "#000000",
        eventColor: "#5b6172",
        eventTextColor: "#e8910c",
        secondColor: "#d72124",
        teamName: "weibo",
        displayedName: "Weibo Gaming",
        country: "CN"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3209/ASTRALIS.png",
        backgroundColor: "#000000",
        eventColor: "#ffffff",
        eventTextColor: "#000000",
        secondColor: "#FF0000",
        teamName: "astralis",
        displayedName: "Astralis",
        country: "DK"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3246/680px_heroic_2023_allmode.png",
        backgroundColor: "#ED1D25",
        eventColor: "#712128",
        eventTextColor: "#ffffff",
        secondColor: "#000000",
        teamName: "heroic",
        displayedName: "Heroic",
        country: "DK"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/126504/8362.png",
        backgroundColor: "#222224",
        eventColor: "#ffffff",
        eventTextColor: "#222224",
        secondColor: "#c6aa76",
        teamName: "mad-lions",
        displayedName: "MAD Lions KOI",
        country: "ES"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/395/600px-SK_Gaminglogo_square.png",
        backgroundColor: "#19005a",
        eventColor: "#6900e1",
        eventTextColor: "#ffffff",
        secondColor: "#ffffff",
        teamName: "sk-gaming",
        displayedName: "SK Gaming",
        country: "DE"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130105/team_hereticslogo_square.png",
        backgroundColor: "#ffffff",
        eventColor: "#e1dacc",
        eventTextColor: "#000000",
        secondColor: "#c1af71",
        teamName: "heretics",
        displayedName: "Team Heretics",
        country: "ES"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/3983/rogue__28_european_team_29logo_square.png",
        backgroundColor: "#303030",
        eventColor: "#04b4fb",
        eventTextColor: "#000000",
        secondColor: "#f5821f",
        teamName: "rogue",
        displayedName: "Rogue",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/129197/bk_rog_esports.png",
        backgroundColor: "#19191e",
        eventColor: "#d2ddde",
        eventTextColor: "#000000",
        secondColor: "#d2ddde",
        teamName: "bk-rog",
        displayedName: "BK ROG Esports",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/126750/220px_game_wardlogo_square.png",
        backgroundColor: "#e8dadc",
        eventColor: "#954658",
        eventTextColor: "#ffffff",
        secondColor: "#201c32",
        teamName: "gameward",
        displayedName: "GameWard",
        country: "FR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/124530/8297.png",
        backgroundColor: "#787f97",
        eventColor: "#ecebeb",
        eventTextColor: "#000000",
        secondColor: "#13141c",
        teamName: "furia",
        displayedName: "FURIA",
        country: "BR"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130704/team_falconslogo_square.png",
        backgroundColor: "#122126",
        eventColor: "#436c62",
        eventTextColor: "#ffffff",
        secondColor: "#0fb76d",
        teamName: "falcons",
        displayedName: "Falcons Esports",
        country: "SA"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/131998/600px_rule_one_full_lightmode.png",
        backgroundColor: "#edba8a",
        eventColor: "#f27545",
        eventTextColor: "#ffffff",
        secondColor: "#f04a4e",
        teamName: "rule-one",
        displayedName: "Rule One",
        country: "SA"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130923/600px_moist_esports_allmode.png",
        backgroundColor: "#282828",
        eventColor: "#c4eaef",
        eventTextColor: "#000000",
        secondColor: "#59bdee",
        teamName: "moist",
        displayedName: "Moist Esports",
        country: "US"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/1566/qw_yi_qu_j.png",
        backgroundColor: "#303030",
        eventColor: "#348ca4",
        eventTextColor: "#ffffff",
        secondColor: "#fa7298",
        teamName: "bilibili-gaming",
        displayedName: "Bilibili Gaming",
        country: "CN"
    },
    {
        image_url: "https://cdn.pandascore.co/images/team/image/130137/600px_drx_full_allmode.png",
        backgroundColor: "#f1efef",
        eventColor: "#8e6692",
        eventTextColor: "#000000",
        secondColor: "#262187",
        teamName: "drx",
        displayedName: "DRX",
        country: "KR"
    }
];

const getTeams = async () => {
    try {
        const teams = await AsyncStorage.getItem('teams');
        // console log name of each team
        const teamsParsed = JSON.parse(teams) || [];
        console.log("--------------------");
        console.log("Teams : ");
        teamsParsed.forEach((team) => {
            console.log(team.teamName);
        });
        console.log("--------------------");
        // console.log("teams :" + teams);
        return teams != null ? JSON.parse(teams) : null;
    }
    catch (error) {
        console.log("Error getting teams : " + error);
    }
}

const deleteTeam = async (teamName) => {
    try {
        const teams = await AsyncStorage.getItem('teams');
        const teamsParsed = JSON.parse(teams) || [];

        const teamIndex = teamsParsed.findIndex((team) => team.teamName === teamName);

        if (teamIndex !== -1) {
            teamsParsed.splice(teamIndex, 1);
            await AsyncStorage.setItem('teams', JSON.stringify(teamsParsed));
            getTeams();
        }
    } catch (error) {
        console.log("Error deleting team : " + error);
    }
}

const addTeam = async (teamName, backgroundColor, secondColor, eventColor, eventTextColor, real_slugs, image) => {
    try {
        const teams = await AsyncStorage.getItem('teams');
        const teamsParsed = JSON.parse(teams) || [];
        if (teamsParsed.find((team) => team.teamName === teamName)) {
            alert("Team already exists");
            return;
        }

        const id = teamsParsed.length > 0 ? teamsParsed[teamsParsed.length - 1].id + 1 : 1;
        const slugs = real_slugs ? real_slugs : await getAllSlugs(teamName);
        const image_url = image ? image : await getTeamLogo(teamName);
        const disableSlugs = [];
        const notificate = true;

        teamsParsed.push({
            id: id,
            teamName: teamName,
            backgroundColor: backgroundColor,
            secondColor: secondColor,
            eventColor: eventColor,
            eventTextColor: eventTextColor,
            slugs: slugs,
            disableSlugs: disableSlugs,
            image_url: image_url,
            notificate: notificate
        });

        await AsyncStorage.setItem('teams', JSON.stringify(teamsParsed));
        getTeams();
    } catch (error) {
        console.log("Error adding team : " + error);
    }
}

const updateTeam = async (teamName, backgroundColor, secondColor, eventColor, eventTextColor, slugs, disableSlugs, image_url, notificate) => {
    try {
        const teams = await AsyncStorage.getItem('teams');
        const teamsParsed = JSON.parse(teams) || [];

        const teamIndex = teamsParsed.findIndex((team) => team.teamName === teamName);

        if (teamIndex !== -1) {
            teamsParsed[teamIndex] = {
                id: teamsParsed[teamIndex].id,
                teamName: teamName,
                backgroundColor: backgroundColor,
                secondColor: secondColor,
                eventColor: eventColor,
                eventTextColor: eventTextColor,
                slugs: slugs,
                disableSlugs: disableSlugs,
                image_url: image_url,
                notificate: notificate
            };
            await AsyncStorage.setItem('teams', JSON.stringify(teamsParsed));
            getTeams();
        }
    } catch (error) {
        console.log("Error updating team : " + error);
    }
}

export { defaultTeams, getTeams, deleteTeam, addTeam, updateTeam };