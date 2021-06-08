import DateTime from "luxon/src/datetime";
import { showMessage } from "./utils.js";

export function handleCalcDates(event) {
    const dateCalcResult = document.getElementById("datecalc__result");
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate);
        dateCalcResult.innerHTML = diffToHtml(diff);
    }
    else dateCalcResult.innerHTML = showMessage("Для расчета промежутка необходимо заполнить оба поля");
}

export function diffDates(firstDate, secondDate) {
    firstDate = DateTime.fromISO(firstDate);
    secondDate = DateTime.fromISO(secondDate);

    if (firstDate > secondDate)
        secondDate = [firstDate, firstDate = secondDate][0];

    return secondDate.diff(firstDate, ['years', 'months', 'days']).toObject();
}

export const diffToHtml = diff => `
    <span> 
        ${diff.years ? 'Лет: ' + diff.years : ''} 
        ${diff.months ? 'Месяцев: ' + diff.months : ''} 
        ${diff.days ? 'Дней: ' + diff.days : ''}
    </span>`;

export function dateListener() {
    const dateCalcForm = document.getElementById("datecalc");
    dateCalcForm.addEventListener("submit", handleCalcDates);
}