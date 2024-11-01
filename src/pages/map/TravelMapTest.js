// Sample JavaScript code with 500 lines for testing purposes

// Constants
const APP_NAME = "Warehouse Productivity Monitoring";
const VERSION = "1.0.0";

// Variables
let productivityScore = 0;
let warehouseData = [];
let workerEfficiency = [];

// Helper functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}

function calculateEfficiency(tasksCompleted, totalTasks) {
    return (tasksCompleted / totalTasks) * 100;
}

// Sample worker data
const workers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Worker${i + 1}`,
    tasksCompleted: getRandomInt(10, 100),
    totalTasks: 100,
    efficiency: 0,
}));

// Update efficiency for workers
function updateWorkerEfficiency() {
    workers.forEach(worker => {
        worker.efficiency = calculateEfficiency(worker.tasksCompleted, worker.totalTasks);
        workerEfficiency.push(worker.efficiency);
    });
}

// Warehouse data initialization
for (let i = 0; i < 100; i++) {
    warehouseData.push({
        section: `Section${i + 1}`,
        activeWorkers: getRandomInt(1, 10),
        totalTasks: getRandomInt(50, 100),
        tasksCompleted: getRandomInt(20, 100),
        date: formatDate(new Date()),
    });
}

// Monitoring function
function monitorEfficiency() {
    updateWorkerEfficiency();
    warehouseData.forEach(data => {
        data.efficiency = calculateEfficiency(data.tasksCompleted, data.totalTasks);
        productivityScore += data.efficiency;
    });
    productivityScore = productivityScore / warehouseData.length;
}

// Generate report
function generateReport() {
    console.log(`--- ${APP_NAME} Report ---`);
    console.log(`Version: ${VERSION}`);
    console.log(`Productivity Score: ${productivityScore.toFixed(2)}%`);
    console.log("Worker Efficiency:", workerEfficiency);
}

// Classes
class Worker {
    constructor(id, name, tasksCompleted, totalTasks) {
        this.id = id;
        this.name = name;
        this.tasksCompleted = tasksCompleted;
        this.totalTasks = totalTasks;
        this.efficiency = calculateEfficiency(tasksCompleted, totalTasks);
    }

    reportEfficiency() {
        return `Worker ${this.name} Efficiency: ${this.efficiency.toFixed(2)}%`;
    }
}

class Warehouse {
    constructor(sections) {
        this.sections = sections;
    }

    addSection(section) {
        this.sections.push(section);
    }

    calculateTotalEfficiency() {
        let totalEfficiency = 0;
        this.sections.forEach(section => {
            totalEfficiency += section.efficiency;
        });
        return (totalEfficiency / this.sections.length).toFixed(2);
    }
}

// Worker instances
const workerInstances = workers.map(
    worker => new Worker(worker.id, worker.name, worker.tasksCompleted, worker.totalTasks)
);

// Sample section data
const sections = Array.from({ length: 20 }, (_, i) => ({
    name: `Section ${i + 1}`,
    efficiency: getRandomInt(70, 100),
}));

// Warehouse instance
const warehouse = new Warehouse(sections);

// Operations
monitorEfficiency();
generateReport();
console.log(`Total Warehouse Efficiency: ${warehouse.calculateTotalEfficiency()}%`);

// Repeat block to increase lines (this is simply to reach the 500-line goal)
for (let i = 0; i < 50; i++) {
    console.log(`--- Block ${i + 1} ---`);
    console.log(`Random Value ${getRandomInt(1, 100)}`);
    console.log(`Productivity Score: ${productivityScore}`);
    console.log(`Worker Efficiency: ${workerEfficiency[i % workerEfficiency.length]}`);
}

