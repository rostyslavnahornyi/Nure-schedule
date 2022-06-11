import axios from "axios";
import iconv from "iconv-lite";

const request = async (url) => {
    const response = await axios({
        method: "GET",
        url: url,
        responseType: "arraybuffer",
    });
    const data = iconv.decode(Buffer.from(response.data), "windows-1251");

    try {
        return JSON.parse(data);
    } catch (error) {
        throw new Error("No data for this group.");
    }
};

export const getGroups = async () => {
    const url = "http://cist.nure.ua/ias/app/tt/P_API_GROUP_JSON";

    return (await request(url))["university"]["faculties"];
};

export const getSchedule = async (id) => {
    const url = `http://cist.nure.ua/ias/app/tt/P_API_EVENT_JSON?timetable_id=${id}&${process.env.SECRET}`;

    return await request(url);
};
