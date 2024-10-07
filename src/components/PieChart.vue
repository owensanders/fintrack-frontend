<template>
  <div class="relative h-64">
    <canvas id="incomeExpensesChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, defineProps } from "vue";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend);

const props = defineProps<{
  income: number;
  expenses: number;
}>();

let pieChart: Chart<"pie", number[], string> | null = null;

const renderChart = () => {
  const ctx = (
    document.getElementById("incomeExpensesChart") as HTMLCanvasElement
  ).getContext("2d");

  if (ctx) {
    if (pieChart) pieChart.destroy();

    pieChart = new Chart<"pie", number[], string>(ctx, {
      type: "pie",
      data: {
        labels: ["Expenses", "Remaining Income"],
        datasets: [
          {
            label: "Income vs Expenses",
            data: [props.expenses, props.income - props.expenses],
            backgroundColor: ["#EF4444", "#10B981"], // Red for expenses, green for income
            hoverBackgroundColor: ["#F87171", "#34D399"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return `${context.label}: £${value}`;
              },
            },
          },
        },
      },
    });
  }
};

watch([() => props.income, () => props.expenses], renderChart);

onMounted(() => {
  renderChart();
});
</script>
