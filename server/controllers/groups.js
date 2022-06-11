import { getGroups, getSchedule } from "../services/requests.js";
import lodash from "lodash";
import {
    eventsToDays,
    getDatesBetweenTwoDates,
    setMaxPairsDay,
} from "../utils/index.js";

export const getAllGroups = async (req, res) => {
    try {
        const groups = [];
        const response = await getGroups();

        response.forEach((faculty) =>
            faculty.directions.forEach((direction) => {
                if (direction?.groups) {
                    groups.push(...direction.groups);
                }
                direction.specialities.forEach((speciality) => {
                    if (speciality?.groups) {
                        groups.push(...speciality.groups);
                    }
                });
            })
        );

        const uniqGroups = lodash.uniqBy(groups, "id");

        res.json(uniqGroups).status(200);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getScheduleById = async (req, res) => {
    const { id } = req.query;

    try {
        const { events, groups, teachers, subjects, types } = await getSchedule(
            id
        );

        let uniqueTypes = new Set();

        events.forEach(({ subject_id, type }, index) => {
            uniqueTypes.add(+type.toString()[0]);

            const indexSubject = subjects.findIndex(
                (subject) => subject.id === subject_id
            );    
            events[index] = {
                ...events[index],
                subject_id: subjects[indexSubject],
            };
        });

        const firstDay = events[0].start_time * 1000;
        const lastDay = events[events.length - 1].start_time * 1000;

        const maxNumberPair = setMaxPairsDay(events);
        const days = getDatesBetweenTwoDates(firstDay, lastDay);
        const daysAmount = days.length;
        const daysWithEvents = eventsToDays(events, daysAmount, maxNumberPair);

        res.json({
            maxNumberPair,
            daysAmount,
            days,
            daysWithEvents,
            groups,
            teachers,
            subjects,
            types: [...uniqueTypes],
        }).status(200);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
