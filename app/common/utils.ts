/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _, { cloneDeep, lowerCase } from "lodash"
import { MONTH_NAMES } from "./constants"
export function fullFormatDate(timeStamp: Date | string | number) {
    const dateObj = new Date(timeStamp)

    const date = dateObj.getDate()
    const year = dateObj.getFullYear()

    return `${date} ${getMonthName(dateObj).substr(0, 3)} ${year}`
}

export function getMonthName(timeStamp: Date | string | number) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    return months[new Date(timeStamp).getMonth()]
}

export function friendlyFormatDate(timeStamp: Date | string | number) {
    const dateObj = new Date(timeStamp)

    const date = dateObj.getDate()
    const month = dateObj.getMonth()
    const year = dateObj.getFullYear()

    return `${date}-${month + 1}-${year}`
}

export function pickerOptionsFromList(
    list: (string | number)[],
): { label: string; value: string | number }[] {
    return list.map((item) => ({
        label: _.upperFirst(String(item)),
        value: labelToValue(item as string),
    }))
}

export function isValidDate(date: any): boolean {
    if (typeof date === "string") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore : issue with running isNaN to an instance of Date - which is not a number
        return new Date(date) instanceof Date && !isNaN(new Date(date))
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore : issue with running isNaN to an instance of Date - which is not a number
    return date instanceof Date && !isNaN(date)
}

export function getYearsFrom(startYear: number): number[] {
    const currentYear = new Date().getFullYear()
    return _.times(currentYear - startYear + 1, (n) => n + startYear)
}

export function getYearsTo(endYear: number): number[] {
    const currentYear = new Date().getFullYear()
    return _.times(endYear - currentYear + 1, (n) => n + currentYear)
}

export function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

export function getMonthNumber(month: string): number {
    return MONTH_NAMES.map((name) => name.toLowerCase()).indexOf(month.toLowerCase())
}

export function getAdultBMI(height: number, weight: number): number {
    if (height === 0) return 0
    return weight / (height / 100) ** 2
}

export function getBMIDescription(bmi: number): string {
    if (isNaN(bmi) || bmi === 0) return "Please enter the height and weight of the patient first."
    if (bmi < 18.5) {
        return "This patient's BMI indicates that they are underweight"
    } else if (bmi >= 18.5 && bmi < 24.99) {
        return "This patient's BMI is normal."
    } else if (bmi >= 25 && bmi < 29.99) {
        return "This patient's BMI indicates that they are overweight"
    } else {
        return "This patient's BMI indicates that that they are Very overweight"
    }
}

export function getBloodPressureAnalysis(
    systolic: number,
    diastolic: number,
): {
    category:
        | "hypotension"
        | "normal"
        | "elevated"
        | "hypertension stage 1"
        | "hypertension stage 2"
        | "hypertensive crisis"
    description: string
} {
    // reference: https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings
    const result = {
        category: "normal",
        description: "",
    }

    if (systolic >= 180 || diastolic >= 120) {
        // Crisis
        result.category = "hypertensive crisis"
        result.description =
            "This patient is in a HYPERTENSIVE CRISIS. Please take steps to lower their Blood Pressure."
    } else if (systolic >= 140 || diastolic >= 90) {
        // stage 2
        result.category = "hypertension stage 2"
        result.description =
            "This patient has an elevated normal blood pressure. Potentially in Stage 2 Hypertension."
    } else if ((systolic >= 130 && systolic < 139) || (diastolic >= 80 && diastolic <= 89)) {
        // stage 1
        result.category = "hypertension stage 1"
        result.description =
            "This patient has an elevated normal blood pressure. Potentially in Stage 1 Hypertension."
    } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
        // elevated
        result.category = "hypertension stage 1"
        result.description = "This patient has an elevated blood pressure"
    } else if (systolic < 120 && diastolic < 80) {
        if (systolic < 90 && diastolic < 60) {
            // hypotension
            result.category = "hypotension"
            result.description =
                "This patient has an abnormally low BP. The patient has Hypotension."
        } else {
            // normal
            result.category = "normal"
            result.description = "This patient has a normal blood pressure"
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result
}

export function valuesToLabels(list: string[]): string[] {
    return list.map((item) => {
        return item
            .split("-")
            .map((item) => _.upperFirst(item))
            .join(" ")
    })
}

export function labelToValue(item: string): string {
    if (typeof item !== "string") return item
    return _.kebabCase(item.toLowerCase())
    // return lowerCase(item).split(" ").join("-")
}

export function adjustColor(color: string, amount: number): string {
    return (
        "#" +
        color
            .replace(/^#/, "")
            .replace(/../g, (color) =>
                (
                    "0" + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
                ).substr(-2),
            )
    )
}

export function toggleStringFromList(text: string, list: string[]): string[] {
    if (list.includes(text)) {
        return list.filter((t) => t !== text)
    }
    return [...list, text]
}

export function yearsDiff(d1, d2) {
    const date1 = new Date(d1)
    const date2 = new Date(d2)
    // const yearsDiff = date2.getFullYear() - date1.getFullYear()
    // return yearsDiff
    return Number((date2.getTime() - date1.getTime()) / 31536000000)
}

export function monthsDiff(d1, d2) {
    const date1 = new Date(d1)
    const date2 = new Date(d2)
    const years = yearsDiff(d1, d2)
    const months = years * 12 + (date2.getMonth() - date1.getMonth())
    return months
}

export const getNextAppointment = (patientAppointments: any[]) => {
    // Note: if there was an error loading the appointments, it will appear as though there is no next appointment
    if (!patientAppointments || patientAppointments.length === 0) return null

    // Get all appointments that were not visited
    const pendingAppointments = patientAppointments.filter(
        (app) => app.appointmentAttended !== true,
    )

    // If there are no pending appointments, return null
    if (pendingAppointments.length === 0) return null

    return pendingAppointments[0]
}

export const getNextAppointmentDate = (patientAppointments: any[]) => {
    const appointment = getNextAppointment(patientAppointments)
    if (!appointment || !appointment.currentAppointmentDate) return null
    return fullFormatDate(appointment.currentAppointmentDate)
}

export function shallowTypeCoerce(
    obj: { [key: string]: any },
    keys: string[],
    type: string | boolean | number,
): { [key: string]: any } {
    const localObj = cloneDeep(obj)

    if (type === "number") {
        keys.forEach((key) => obj[key] && (obj[key] = Number(obj[key])))
    }

    if (type === "string") {
        keys.forEach((key) => obj[key] && (obj[key] = String(obj[key])))
    }

    if (type === "boolean") {
        keys.forEach((key) => obj[key] && (obj[key] = Boolean(obj[key])))
    }

    return localObj
}

export function calculateAge(dob: Date | string): number {
    return isValidDate(dob) ? new Date(dob).getFullYear() - new Date().getFullYear() : 45
}
