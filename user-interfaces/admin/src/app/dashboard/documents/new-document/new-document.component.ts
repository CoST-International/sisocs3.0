import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.scss'],
})
export class NewDocumentComponent implements OnInit {
  isLoading!: boolean;
  errorMessage: string = '';

  documentForm!: FormGroup;

  projects = [
    {
      id: 2584,
      process_number_standard: 'ocds-lcuori-504120DGC-2584',
    },
    {
      id: 2719,
      process_number_standard: 'ocds-lcuori-504120DGC-2719',
    },
    {
      id: 2616,
      process_number_standard: 'ocds-lcuori-504120DGC-2616',
    },
    {
      id: 2721,
      process_number_standard: 'ocds-lcuori-504120DGC-2721',
    },
    {
      id: 2723,
      process_number_standard: 'ocds-lcuori-504120DGC-2723',
    },
    {
      id: 2596,
      process_number_standard: 'ocds-lcuori-504120DGC-2596',
    },
    {
      id: 2724,
      process_number_standard: 'ocds-lcuori-504120DGC-2724',
    },
    {
      id: 2607,
      process_number_standard: 'ocds-lcuori-504120DGC-2607',
    },
    {
      id: 2591,
      process_number_standard: 'ocds-lcuori-504120DGC-2591',
    },
    {
      id: 2597,
      process_number_standard: 'ocds-lcuori-504120DGC-2597',
    },
    {
      id: 2587,
      process_number_standard: 'ocds-lcuori-504120DGC-2587',
    },
    {
      id: 2642,
      process_number_standard: 'ocds-lcuori-504120DGC-2642',
    },
    {
      id: 2641,
      process_number_standard: 'ocds-lcuori-504120DGC-2641',
    },
    {
      id: 2604,
      process_number_standard: 'ocds-lcuori-504120DGC-2604',
    },
    {
      id: 2588,
      process_number_standard: 'ocds-lcuori-504120DGC-2588',
    },
    {
      id: 2751,
      process_number_standard: 'ocds-lcuori-504120DGC-2751',
    },
    {
      id: 2599,
      process_number_standard: 'ocds-lcuori-504120DGC-2599',
    },
    {
      id: 2734,
      process_number_standard: 'ocds-lcuori-504120DGC-2734',
    },
    {
      id: 2600,
      process_number_standard: 'ocds-lcuori-504120DGC-2600',
    },
    {
      id: 2735,
      process_number_standard: 'ocds-lcuori-504120DGC-2735',
    },
    {
      id: 2605,
      process_number_standard: 'ocds-lcuori-504120DGC-2605',
    },
    {
      id: 2736,
      process_number_standard: 'ocds-lcuori-504120DGC-2736',
    },
    {
      id: 2737,
      process_number_standard: 'ocds-lcuori-504120DGC-2737',
    },
    {
      id: 2848,
      process_number_standard: 'ocds-lcuori-504120DGC-2848',
    },
    {
      id: 2610,
      process_number_standard: 'ocds-lcuori-504120DGC-2610',
    },
    {
      id: 2611,
      process_number_standard: 'ocds-lcuori-504120DGC-2611',
    },
    {
      id: 2627,
      process_number_standard: 'ocds-lcuori-504120DGC-2627',
    },
    {
      id: 2738,
      process_number_standard: 'ocds-lcuori-504120DGC-2738',
    },
    {
      id: 2623,
      process_number_standard: 'ocds-lcuori-504120DGC-2623',
    },
    {
      id: 2628,
      process_number_standard: 'ocds-lcuori-504120DGC-2628',
    },
    {
      id: 2764,
      process_number_standard: 'ocds-lcuori-504120DGC-2764',
    },
    {
      id: 2614,
      process_number_standard: 'ocds-lcuori-504120DGC-2614',
    },
    {
      id: 2626,
      process_number_standard: 'ocds-lcuori-504120DGC-2626',
    },
    {
      id: 2634,
      process_number_standard: 'ocds-lcuori-504120DGC-2634',
    },
    {
      id: 2650,
      process_number_standard: 'ocds-lcuori-504120DGC-2650',
    },
    {
      id: 2771,
      process_number_standard: 'ocds-lcuori-504120DGC-2771',
    },
    {
      id: 2651,
      process_number_standard: 'ocds-lcuori-504120DGC-2651',
    },
    {
      id: 2743,
      process_number_standard: 'ocds-lcuori-504120DGC-2743',
    },
    {
      id: 2744,
      process_number_standard: 'ocds-lcuori-504120DGC-2744',
    },
    {
      id: 2781,
      process_number_standard: 'ocds-lcuori-504120DGC-2781',
    },
    {
      id: 2773,
      process_number_standard: 'ocds-lcuori-504120DGC-2773',
    },
    {
      id: 2775,
      process_number_standard: 'ocds-lcuori-504120DGC-2775',
    },
    {
      id: 2655,
      process_number_standard: 'ocds-lcuori-504120DGC-2655',
    },
    {
      id: 2776,
      process_number_standard: 'ocds-lcuori-504120DGC-2776',
    },
    {
      id: 2777,
      process_number_standard: 'ocds-lcuori-504120DGC-2777',
    },
    {
      id: 2656,
      process_number_standard: 'ocds-lcuori-504120DGC-2656',
    },
    {
      id: 2778,
      process_number_standard: 'ocds-lcuori-504120DGC-2778',
    },
    {
      id: 2853,
      process_number_standard: 'ocds-lcuori-504120DGC-2853',
    },
    {
      id: 2661,
      process_number_standard: 'ocds-lcuori-504120DGC-2661',
    },
    {
      id: 2854,
      process_number_standard: 'ocds-lcuori-504120DGC-2854',
    },
    {
      id: 2792,
      process_number_standard: 'ocds-lcuori-504120DGC-2792',
    },
    {
      id: 2783,
      process_number_standard: 'ocds-lcuori-504120DGC-2783',
    },
    {
      id: 2891,
      process_number_standard: 'ocds-lcuori-504120DGC-2891',
    },
    {
      id: 2892,
      process_number_standard: 'ocds-lcuori-504120DGC-2892',
    },
    {
      id: 2888,
      process_number_standard: 'ocds-lcuori-504120DGC-2888',
    },
    {
      id: 2788,
      process_number_standard: 'ocds-lcuori-504120DGC-2788',
    },
    {
      id: 2592,
      process_number_standard: 'ocds-lcuori-504120DGC-2592',
    },
    {
      id: 2640,
      process_number_standard: 'ocds-lcuori-504120DGC-2640',
    },
    {
      id: 2720,
      process_number_standard: 'ocds-lcuori-504120DGC-2720',
    },
    {
      id: 3499,
      process_number_standard: 'ocds-lcuori-504120UDEIP-3499',
    },
    {
      id: 3508,
      process_number_standard: 'ocds-lcuori-504120UDEIP-3508',
    },
    {
      id: 3600,
      process_number_standard: 'ocds-lcuori-504120000-3600',
    },
    {
      id: 3634,
      process_number_standard: 'ocds-lcuori-504120000-3634',
    },
    {
      id: 2593,
      process_number_standard: 'ocds-lcuori-504120DGC-2593',
    },
    {
      id: 2747,
      process_number_standard: 'ocds-lcuori-504120DGC-2747',
    },
    {
      id: 2748,
      process_number_standard: 'ocds-lcuori-504120DGC-2748',
    },
    {
      id: 2585,
      process_number_standard: 'ocds-lcuori-504120DGC-2585',
    },
    {
      id: 2586,
      process_number_standard: 'ocds-lcuori-504120DGC-2586',
    },
    {
      id: 2722,
      process_number_standard: 'ocds-lcuori-504120DGC-2722',
    },
    {
      id: 2595,
      process_number_standard: 'ocds-lcuori-504120DGC-2595',
    },
    {
      id: 2639,
      process_number_standard: 'ocds-lcuori-504120DGC-2639',
    },
    {
      id: 2964,
      process_number_standard: 'ocds-lcuori-504120DGC-2964',
    },
    {
      id: 2725,
      process_number_standard: 'ocds-lcuori-504120DGC-2725',
    },
    {
      id: 2726,
      process_number_standard: 'ocds-lcuori-504120DGC-2726',
    },
    {
      id: 2727,
      process_number_standard: 'ocds-lcuori-504120DGC-2727',
    },
    {
      id: 2590,
      process_number_standard: 'ocds-lcuori-504120DGC-2590',
    },
    {
      id: 2728,
      process_number_standard: 'ocds-lcuori-504120DGC-2728',
    },
    {
      id: 2624,
      process_number_standard: 'ocds-lcuori-504120DGC-2624',
    },
    {
      id: 2749,
      process_number_standard: 'ocds-lcuori-504120DGC-2749',
    },
    {
      id: 2729,
      process_number_standard: 'ocds-lcuori-504120DGC-2729',
    },
    {
      id: 2608,
      process_number_standard: 'ocds-lcuori-504120DGC-2608',
    },
    {
      id: 2730,
      process_number_standard: 'ocds-lcuori-504120DGC-2730',
    },
    {
      id: 2619,
      process_number_standard: 'ocds-lcuori-504120DGC-2619',
    },
    {
      id: 2645,
      process_number_standard: 'ocds-lcuori-504120DGC-2645',
    },
    {
      id: 2731,
      process_number_standard: 'ocds-lcuori-504120DGC-2731',
    },
    {
      id: 2602,
      process_number_standard: 'ocds-lcuori-504120DGC-2602',
    },
    {
      id: 2732,
      process_number_standard: 'ocds-lcuori-504120DGC-2732',
    },
    {
      id: 2806,
      process_number_standard: 'ocds-lcuori-504120DGC-2806',
    },
    {
      id: 2733,
      process_number_standard: 'ocds-lcuori-504120DGC-2733',
    },
    {
      id: 2818,
      process_number_standard: 'ocds-lcuori-504120DGC-2818',
    },
    {
      id: 2589,
      process_number_standard: 'ocds-lcuori-504120DGC-2589',
    },
    {
      id: 2750,
      process_number_standard: 'ocds-lcuori-504120DGC-2750',
    },
    {
      id: 2598,
      process_number_standard: 'ocds-lcuori-504120DGC-2598',
    },
    {
      id: 2594,
      process_number_standard: 'ocds-lcuori-504120DGC-2594',
    },
    {
      id: 2606,
      process_number_standard: 'ocds-lcuori-504120DGC-2606',
    },
    {
      id: 2847,
      process_number_standard: 'ocds-lcuori-504120DGC-2847',
    },
    {
      id: 2706,
      process_number_standard: 'ocds-lcuori-504120DGC-2706',
    },
    {
      id: 2617,
      process_number_standard: 'ocds-lcuori-504120DGC-2617',
    },
    {
      id: 2752,
      process_number_standard: 'ocds-lcuori-504120DGC-2752',
    },
    {
      id: 2629,
      process_number_standard: 'ocds-lcuori-504120DGC-2629',
    },
    {
      id: 2753,
      process_number_standard: 'ocds-lcuori-504120DGC-2753',
    },
    {
      id: 2630,
      process_number_standard: 'ocds-lcuori-504120DGC-2630',
    },
    {
      id: 2754,
      process_number_standard: 'ocds-lcuori-504120DGC-2754',
    },
    {
      id: 2636,
      process_number_standard: 'ocds-lcuori-504120DGC-2636',
    },
    {
      id: 2755,
      process_number_standard: 'ocds-lcuori-504120DGC-2755',
    },
    {
      id: 2756,
      process_number_standard: 'ocds-lcuori-504120DGC-2756',
    },
    {
      id: 2612,
      process_number_standard: 'ocds-lcuori-504120DGC-2612',
    },
    {
      id: 2757,
      process_number_standard: 'ocds-lcuori-504120DGC-2757',
    },
    {
      id: 2758,
      process_number_standard: 'ocds-lcuori-504120DGC-2758',
    },
    {
      id: 2631,
      process_number_standard: 'ocds-lcuori-504120DGC-2631',
    },
    {
      id: 2849,
      process_number_standard: 'ocds-lcuori-504120DGC-2849',
    },
    {
      id: 2637,
      process_number_standard: 'ocds-lcuori-504120DGC-2637',
    },
    {
      id: 2759,
      process_number_standard: 'ocds-lcuori-504120DGC-2759',
    },
    {
      id: 2807,
      process_number_standard: 'ocds-lcuori-504120DGC-2807',
    },
    {
      id: 2684,
      process_number_standard: 'ocds-lcuori-504120DGC-2684',
    },
    {
      id: 2760,
      process_number_standard: 'ocds-lcuori-504120DGC-2760',
    },
    {
      id: 2613,
      process_number_standard: 'ocds-lcuori-504120DGC-2613',
    },
    {
      id: 2850,
      process_number_standard: 'ocds-lcuori-504120DGC-2850',
    },
    {
      id: 2621,
      process_number_standard: 'ocds-lcuori-504120DGC-2621',
    },
    {
      id: 2761,
      process_number_standard: 'ocds-lcuori-504120DGC-2761',
    },
    {
      id: 2615,
      process_number_standard: 'ocds-lcuori-504120DGC-2615',
    },
    {
      id: 2762,
      process_number_standard: 'ocds-lcuori-504120DGC-2762',
    },
    {
      id: 2601,
      process_number_standard: 'ocds-lcuori-504120DGC-2601',
    },
    {
      id: 2763,
      process_number_standard: 'ocds-lcuori-504120DGC-2763',
    },
    {
      id: 2851,
      process_number_standard: 'ocds-lcuori-504120DGC-2851',
    },
    {
      id: 2618,
      process_number_standard: 'ocds-lcuori-504120DGC-2618',
    },
    {
      id: 2635,
      process_number_standard: 'ocds-lcuori-504120DGC-2635',
    },
    {
      id: 2739,
      process_number_standard: 'ocds-lcuori-504120DGC-2739',
    },
    {
      id: 2632,
      process_number_standard: 'ocds-lcuori-504120DGC-2632',
    },
    {
      id: 2779,
      process_number_standard: 'ocds-lcuori-504120DGC-2779',
    },
    {
      id: 2808,
      process_number_standard: 'ocds-lcuori-504120DGC-2808',
    },
    {
      id: 2780,
      process_number_standard: 'ocds-lcuori-504120DGC-2780',
    },
    {
      id: 2633,
      process_number_standard: 'ocds-lcuori-504120DGC-2633',
    },
    {
      id: 2740,
      process_number_standard: 'ocds-lcuori-504120DGC-2740',
    },
    {
      id: 2625,
      process_number_standard: 'ocds-lcuori-504120DGC-2625',
    },
    {
      id: 2741,
      process_number_standard: 'ocds-lcuori-504120DGC-2741',
    },
    {
      id: 2620,
      process_number_standard: 'ocds-lcuori-504120DGC-2620',
    },
    {
      id: 2765,
      process_number_standard: 'ocds-lcuori-504120DGC-2765',
    },
    {
      id: 2766,
      process_number_standard: 'ocds-lcuori-504120DGC-2766',
    },
    {
      id: 2767,
      process_number_standard: 'ocds-lcuori-504120DGC-2767',
    },
    {
      id: 2768,
      process_number_standard: 'ocds-lcuori-504120DGC-2768',
    },
    {
      id: 2769,
      process_number_standard: 'ocds-lcuori-504120DGC-2769',
    },
    {
      id: 2677,
      process_number_standard: 'ocds-lcuori-504120DGC-2677',
    },
    {
      id: 2770,
      process_number_standard: 'ocds-lcuori-504120DGC-2770',
    },
    {
      id: 2772,
      process_number_standard: 'ocds-lcuori-504120DGC-2772',
    },
    {
      id: 2660,
      process_number_standard: 'ocds-lcuori-504120DGC-2660',
    },
    {
      id: 2742,
      process_number_standard: 'ocds-lcuori-504120DGC-2742',
    },
    {
      id: 2668,
      process_number_standard: 'ocds-lcuori-504120DGC-2668',
    },
    {
      id: 2786,
      process_number_standard: 'ocds-lcuori-504120DGC-2786',
    },
    {
      id: 2665,
      process_number_standard: 'ocds-lcuori-504120DGC-2665',
    },
    {
      id: 2652,
      process_number_standard: 'ocds-lcuori-504120DGC-2652',
    },
    {
      id: 2813,
      process_number_standard: 'ocds-lcuori-504120DGC-2813',
    },
    {
      id: 2653,
      process_number_standard: 'ocds-lcuori-504120DGC-2653',
    },
    {
      id: 2669,
      process_number_standard: 'ocds-lcuori-504120DGC-2669',
    },
    {
      id: 2654,
      process_number_standard: 'ocds-lcuori-504120DGC-2654',
    },
    {
      id: 2774,
      process_number_standard: 'ocds-lcuori-504120DGC-2774',
    },
    {
      id: 2911,
      process_number_standard: 'ocds-lcuori-504120DGC-2911',
    },
    {
      id: 2671,
      process_number_standard: 'ocds-lcuori-504120DGC-2671',
    },
    {
      id: 2672,
      process_number_standard: 'ocds-lcuori-504120DGC-2672',
    },
    {
      id: 2657,
      process_number_standard: 'ocds-lcuori-504120DGC-2657',
    },
    {
      id: 2784,
      process_number_standard: 'ocds-lcuori-504120DGC-2784',
    },
    {
      id: 2658,
      process_number_standard: 'ocds-lcuori-504120DGC-2658',
    },
    {
      id: 2817,
      process_number_standard: 'ocds-lcuori-504120DGC-2817',
    },
    {
      id: 2852,
      process_number_standard: 'ocds-lcuori-504120DGC-2852',
    },
    {
      id: 2670,
      process_number_standard: 'ocds-lcuori-504120DGC-2670',
    },
    {
      id: 2789,
      process_number_standard: 'ocds-lcuori-504120DGC-2789',
    },
    {
      id: 2912,
      process_number_standard: 'ocds-lcuori-504120DGC-2912',
    },
    {
      id: 2709,
      process_number_standard: 'ocds-lcuori-504120DGC-2709',
    },
    {
      id: 2659,
      process_number_standard: 'ocds-lcuori-504120DGC-2659',
    },
    {
      id: 2793,
      process_number_standard: 'ocds-lcuori-504120DGC-2793',
    },
    {
      id: 2666,
      process_number_standard: 'ocds-lcuori-504120DGC-2666',
    },
    {
      id: 2790,
      process_number_standard: 'ocds-lcuori-504120DGC-2790',
    },
    {
      id: 2667,
      process_number_standard: 'ocds-lcuori-504120DGC-2667',
    },
    {
      id: 2785,
      process_number_standard: 'ocds-lcuori-504120DGC-2785',
    },
    {
      id: 2662,
      process_number_standard: 'ocds-lcuori-504120DGC-2662',
    },
    {
      id: 2745,
      process_number_standard: 'ocds-lcuori-504120DGC-2745',
    },
    {
      id: 2791,
      process_number_standard: 'ocds-lcuori-504120DGC-2791',
    },
    {
      id: 2673,
      process_number_standard: 'ocds-lcuori-504120DGC-2673',
    },
    {
      id: 2787,
      process_number_standard: 'ocds-lcuori-504120DGC-2787',
    },
    {
      id: 2663,
      process_number_standard: 'ocds-lcuori-504120DGC-2663',
    },
    {
      id: 2782,
      process_number_standard: 'ocds-lcuori-504120DGC-2782',
    },
    {
      id: 2746,
      process_number_standard: 'ocds-lcuori-504120DGC-2746',
    },
    {
      id: 2913,
      process_number_standard: 'ocds-lcuori-504120DGC-2913',
    },
    {
      id: 2664,
      process_number_standard: 'ocds-lcuori-504120DGC-2664',
    },
    {
      id: 2681,
      process_number_standard: 'ocds-lcuori-504120DGC-2681',
    },
    {
      id: 2678,
      process_number_standard: 'ocds-lcuori-504120DGC-2678',
    },
    {
      id: 2981,
      process_number_standard: 'ocds-lcuori-504120DGC-2981',
    },
    {
      id: 2679,
      process_number_standard: 'ocds-lcuori-504120DGC-2679',
    },
    {
      id: 2676,
      process_number_standard: 'ocds-lcuori-504120DGC-2676',
    },
    {
      id: 2674,
      process_number_standard: 'ocds-lcuori-504120DGC-2674',
    },
    {
      id: 2982,
      process_number_standard: 'ocds-lcuori-504120DGC-2982',
    },
    {
      id: 2675,
      process_number_standard: 'ocds-lcuori-504120DGC-2675',
    },
    {
      id: 2680,
      process_number_standard: 'ocds-lcuori-504120DGC-2680',
    },
    {
      id: 2712,
      process_number_standard: 'ocds-lcuori-504120DGC-2712',
    },
    {
      id: 2865,
      process_number_standard: 'ocds-lcuori-504120DGC-2865',
    },
    {
      id: 2578,
      process_number_standard: 'ocds-lcuori-504120DGC-2578',
    },
    {
      id: 2809,
      process_number_standard: 'ocds-lcuori-504120DGC-2809',
    },
    {
      id: 2685,
      process_number_standard: 'ocds-lcuori-504120DGC-2685',
    },
    {
      id: 2866,
      process_number_standard: 'ocds-lcuori-504120DGC-2866',
    },
    {
      id: 2689,
      process_number_standard: 'ocds-lcuori-504120DGC-2689',
    },
    {
      id: 2889,
      process_number_standard: 'ocds-lcuori-504120DGC-2889',
    },
    {
      id: 2682,
      process_number_standard: 'ocds-lcuori-504120DGC-2682',
    },
    {
      id: 2890,
      process_number_standard: 'ocds-lcuori-504120DGC-2890',
    },
    {
      id: 2715,
      process_number_standard: 'ocds-lcuori-504120DGC-2715',
    },
    {
      id: 2690,
      process_number_standard: 'ocds-lcuori-504120DGC-2690',
    },
    {
      id: 2683,
      process_number_standard: 'ocds-lcuori-504120DGC-2683',
    },
    {
      id: 2686,
      process_number_standard: 'ocds-lcuori-504120DGC-2686',
    },
    {
      id: 2983,
      process_number_standard: 'ocds-lcuori-504120DGC-2983',
    },
    {
      id: 2810,
      process_number_standard: 'ocds-lcuori-504120DGC-2810',
    },
    {
      id: 2649,
      process_number_standard: 'ocds-lcuori-504120DGC-2649',
    },
    {
      id: 2717,
      process_number_standard: 'ocds-lcuori-504120DGC-2717',
    },
    {
      id: 2811,
      process_number_standard: 'ocds-lcuori-504120DGC-2811',
    },
    {
      id: 2713,
      process_number_standard: 'ocds-lcuori-504120DGC-2713',
    },
    {
      id: 2812,
      process_number_standard: 'ocds-lcuori-504120DGC-2812',
    },
    {
      id: 2714,
      process_number_standard: 'ocds-lcuori-504120DGC-2714',
    },
    {
      id: 2839,
      process_number_standard: 'ocds-lcuori-504120DGC-2839',
    },
    {
      id: 2693,
      process_number_standard: 'ocds-lcuori-504120DGC-2693',
    },
    {
      id: 2867,
      process_number_standard: 'ocds-lcuori-504120DGC-2867',
    },
    {
      id: 2687,
      process_number_standard: 'ocds-lcuori-504120DGC-2687',
    },
    {
      id: 2840,
      process_number_standard: 'ocds-lcuori-504120DGC-2840',
    },
    {
      id: 2710,
      process_number_standard: 'ocds-lcuori-504120DGC-2710',
    },
    {
      id: 2795,
      process_number_standard: 'ocds-lcuori-504120DGC-2795',
    },
    {
      id: 2691,
      process_number_standard: 'ocds-lcuori-504120DGC-2691',
    },
    {
      id: 2855,
      process_number_standard: 'ocds-lcuori-504120DGC-2855',
    },
    {
      id: 2716,
      process_number_standard: 'ocds-lcuori-504120DGC-2716',
    },
    {
      id: 2796,
      process_number_standard: 'ocds-lcuori-504120DGC-2796',
    },
    {
      id: 2688,
      process_number_standard: 'ocds-lcuori-504120DGC-2688',
    },
    {
      id: 2819,
      process_number_standard: 'ocds-lcuori-504120DGC-2819',
    },
    {
      id: 2893,
      process_number_standard: 'ocds-lcuori-504120DGC-2893',
    },
    {
      id: 2871,
      process_number_standard: 'ocds-lcuori-504120DGC-2871',
    },
    {
      id: 2704,
      process_number_standard: 'ocds-lcuori-504120DGC-2704',
    },
    {
      id: 2820,
      process_number_standard: 'ocds-lcuori-504120DGC-2820',
    },
    {
      id: 3022,
      process_number_standard: 'ocds-lcuori-504120DGC-3022',
    },
    {
      id: 3023,
      process_number_standard: 'ocds-lcuori-504120DGC-3023',
    },
    {
      id: 2894,
      process_number_standard: 'ocds-lcuori-504120DGC-2894',
    },
    {
      id: 2895,
      process_number_standard: 'ocds-lcuori-504120DGC-2895',
    },
    {
      id: 2863,
      process_number_standard: 'ocds-lcuori-504120DGC-2863',
    },
    {
      id: 2864,
      process_number_standard: 'ocds-lcuori-504120DGC-2864',
    },
    {
      id: 2814,
      process_number_standard: 'ocds-lcuori-504120DGC-2814',
    },
    {
      id: 2984,
      process_number_standard: 'ocds-lcuori-504120DGC-2984',
    },
    {
      id: 2803,
      process_number_standard: 'ocds-lcuori-504120DGC-2803',
    },
    {
      id: 2856,
      process_number_standard: 'ocds-lcuori-504120DGC-2856',
    },
    {
      id: 2821,
      process_number_standard: 'ocds-lcuori-504120DGC-2821',
    },
    {
      id: 2872,
      process_number_standard: 'ocds-lcuori-504120DGC-2872',
    },
    {
      id: 2711,
      process_number_standard: 'ocds-lcuori-504120DGC-2711',
    },
    {
      id: 3019,
      process_number_standard: 'ocds-lcuori-504120DGC-3019',
    },
    {
      id: 3020,
      process_number_standard: 'ocds-lcuori-504120DGC-3020',
    },
    {
      id: 2906,
      process_number_standard: 'ocds-lcuori-504120DGC-2906',
    },
    {
      id: 3021,
      process_number_standard: 'ocds-lcuori-504120DGC-3021',
    },
    {
      id: 2985,
      process_number_standard: 'ocds-lcuori-504120DGC-2985',
    },
    {
      id: 2800,
      process_number_standard: 'ocds-lcuori-504120DGC-2800',
    },
    {
      id: 2986,
      process_number_standard: 'ocds-lcuori-504120DGC-2986',
    },
    {
      id: 2987,
      process_number_standard: 'ocds-lcuori-504120DGC-2987',
    },
    {
      id: 2907,
      process_number_standard: 'ocds-lcuori-504120DGC-2907',
    },
    {
      id: 2988,
      process_number_standard: 'ocds-lcuori-504120DGC-2988',
    },
    {
      id: 2801,
      process_number_standard: 'ocds-lcuori-504120DGC-2801',
    },
    {
      id: 2797,
      process_number_standard: 'ocds-lcuori-504120DGC-2797',
    },
    {
      id: 2914,
      process_number_standard: 'ocds-lcuori-504120DGC-2914',
    },
    {
      id: 2841,
      process_number_standard: 'ocds-lcuori-504120DGC-2841',
    },
    {
      id: 2857,
      process_number_standard: 'ocds-lcuori-504120DGC-2857',
    },
    {
      id: 2822,
      process_number_standard: 'ocds-lcuori-504120DGC-2822',
    },
    {
      id: 2989,
      process_number_standard: 'ocds-lcuori-504120DGC-2989',
    },
    {
      id: 2915,
      process_number_standard: 'ocds-lcuori-504120DGC-2915',
    },
    {
      id: 2842,
      process_number_standard: 'ocds-lcuori-504120DGC-2842',
    },
    {
      id: 2804,
      process_number_standard: 'ocds-lcuori-504120DGC-2804',
    },
    {
      id: 2823,
      process_number_standard: 'ocds-lcuori-504120DGC-2823',
    },
    {
      id: 2798,
      process_number_standard: 'ocds-lcuori-504120DGC-2798',
    },
    {
      id: 2873,
      process_number_standard: 'ocds-lcuori-504120DGC-2873',
    },
    {
      id: 2824,
      process_number_standard: 'ocds-lcuori-504120DGC-2824',
    },
    {
      id: 2825,
      process_number_standard: 'ocds-lcuori-504120DGC-2825',
    },
    {
      id: 2826,
      process_number_standard: 'ocds-lcuori-504120DGC-2826',
    },
    {
      id: 2858,
      process_number_standard: 'ocds-lcuori-504120DGC-2858',
    },
    {
      id: 2843,
      process_number_standard: 'ocds-lcuori-504120DGC-2843',
    },
    {
      id: 2805,
      process_number_standard: 'ocds-lcuori-504120DGC-2805',
    },
    {
      id: 2827,
      process_number_standard: 'ocds-lcuori-504120DGC-2827',
    },
    {
      id: 2828,
      process_number_standard: 'ocds-lcuori-504120DGC-2828',
    },
    {
      id: 2844,
      process_number_standard: 'ocds-lcuori-504120DGC-2844',
    },
    {
      id: 2880,
      process_number_standard: 'ocds-lcuori-504120DGC-2880',
    },
    {
      id: 2990,
      process_number_standard: 'ocds-lcuori-504120DGC-2990',
    },
    {
      id: 2829,
      process_number_standard: 'ocds-lcuori-504120DGC-2829',
    },
    {
      id: 2846,
      process_number_standard: 'ocds-lcuori-504120DGC-2846',
    },
    {
      id: 2815,
      process_number_standard: 'ocds-lcuori-504120DGC-2815',
    },
    {
      id: 2816,
      process_number_standard: 'ocds-lcuori-504120DGC-2816',
    },
    {
      id: 2905,
      process_number_standard: 'ocds-lcuori-504120DGC-2905',
    },
    {
      id: 2705,
      process_number_standard: 'ocds-lcuori-504120DGC-2705',
    },
    {
      id: 2802,
      process_number_standard: 'ocds-lcuori-504120DGC-2802',
    },
    {
      id: 2830,
      process_number_standard: 'ocds-lcuori-504120DGC-2830',
    },
    {
      id: 2831,
      process_number_standard: 'ocds-lcuori-504120DGC-2831',
    },
    {
      id: 2832,
      process_number_standard: 'ocds-lcuori-504120DGC-2832',
    },
    {
      id: 2833,
      process_number_standard: 'ocds-lcuori-504120DGC-2833',
    },
    {
      id: 2834,
      process_number_standard: 'ocds-lcuori-504120DGC-2834',
    },
    {
      id: 2966,
      process_number_standard: 'ocds-lcuori-504120DGC-2966',
    },
    {
      id: 2835,
      process_number_standard: 'ocds-lcuori-504120DGC-2835',
    },
    {
      id: 2836,
      process_number_standard: 'ocds-lcuori-504120DGC-2836',
    },
    {
      id: 2859,
      process_number_standard: 'ocds-lcuori-504120DGC-2859',
    },
    {
      id: 2991,
      process_number_standard: 'ocds-lcuori-504120DGC-2991',
    },
    {
      id: 2992,
      process_number_standard: 'ocds-lcuori-504120DGC-2992',
    },
    {
      id: 2993,
      process_number_standard: 'ocds-lcuori-504120DGC-2993',
    },
    {
      id: 3005,
      process_number_standard: 'ocds-lcuori-504120DGC-3005',
    },
    {
      id: 2860,
      process_number_standard: 'ocds-lcuori-504120DGC-2860',
    },
    {
      id: 2577,
      process_number_standard: 'ocds-lcuori-504120DGC-2577',
    },
    {
      id: 2868,
      process_number_standard: 'ocds-lcuori-504120DGC-2868',
    },
    {
      id: 2965,
      process_number_standard: 'ocds-lcuori-504120DGC-2965',
    },
    {
      id: 3006,
      process_number_standard: 'ocds-lcuori-504120DGC-3006',
    },
    {
      id: 2579,
      process_number_standard: 'ocds-lcuori-504120DGC-2579',
    },
    {
      id: 2997,
      process_number_standard: 'ocds-lcuori-504120DGC-2997',
    },
    {
      id: 2998,
      process_number_standard: 'ocds-lcuori-504120DGC-2998',
    },
    {
      id: 2837,
      process_number_standard: 'ocds-lcuori-504120DGC-2837',
    },
    {
      id: 2861,
      process_number_standard: 'ocds-lcuori-504120DGC-2861',
    },
    {
      id: 2580,
      process_number_standard: 'ocds-lcuori-504120DGC-2580',
    },
    {
      id: 2838,
      process_number_standard: 'ocds-lcuori-504120DGC-2838',
    },
    {
      id: 2862,
      process_number_standard: 'ocds-lcuori-504120DGC-2862',
    },
    {
      id: 3000,
      process_number_standard: 'ocds-lcuori-504120DGC-3000',
    },
    {
      id: 2896,
      process_number_standard: 'ocds-lcuori-504120DGC-2896',
    },
    {
      id: 3013,
      process_number_standard: 'ocds-lcuori-504120DGC-3013',
    },
    {
      id: 2916,
      process_number_standard: 'ocds-lcuori-504120DGC-2916',
    },
    {
      id: 2917,
      process_number_standard: 'ocds-lcuori-504120DGC-2917',
    },
    {
      id: 2918,
      process_number_standard: 'ocds-lcuori-504120DGC-2918',
    },
    {
      id: 2968,
      process_number_standard: 'ocds-lcuori-504120DGC-2968',
    },
    {
      id: 2699,
      process_number_standard: 'ocds-lcuori-504120DGC-2699',
    },
    {
      id: 2919,
      process_number_standard: 'ocds-lcuori-504120DGC-2919',
    },
    {
      id: 2920,
      process_number_standard: 'ocds-lcuori-504120DGC-2920',
    },
    {
      id: 3007,
      process_number_standard: 'ocds-lcuori-504120DGC-3007',
    },
    {
      id: 2921,
      process_number_standard: 'ocds-lcuori-504120DGC-2921',
    },
    {
      id: 2923,
      process_number_standard: 'ocds-lcuori-504120DGC-2923',
    },
    {
      id: 2924,
      process_number_standard: 'ocds-lcuori-504120DGC-2924',
    },
    {
      id: 2884,
      process_number_standard: 'ocds-lcuori-504120DGC-2884',
    },
    {
      id: 2897,
      process_number_standard: 'ocds-lcuori-504120DGC-2897',
    },
    {
      id: 2898,
      process_number_standard: 'ocds-lcuori-504120DGC-2898',
    },
    {
      id: 2874,
      process_number_standard: 'ocds-lcuori-504120DGC-2874',
    },
    {
      id: 2707,
      process_number_standard: 'ocds-lcuori-504120DGC-2707',
    },
    {
      id: 2887,
      process_number_standard: 'ocds-lcuori-504120DGC-2887',
    },
    {
      id: 2948,
      process_number_standard: 'ocds-lcuori-504120DGC-2948',
    },
    {
      id: 2999,
      process_number_standard: 'ocds-lcuori-504120DGC-2999',
    },
    {
      id: 2885,
      process_number_standard: 'ocds-lcuori-504120DGC-2885',
    },
    {
      id: 2899,
      process_number_standard: 'ocds-lcuori-504120DGC-2899',
    },
    {
      id: 2900,
      process_number_standard: 'ocds-lcuori-504120DGC-2900',
    },
    {
      id: 2881,
      process_number_standard: 'ocds-lcuori-504120DGC-2881',
    },
    {
      id: 2708,
      process_number_standard: 'ocds-lcuori-504120DGC-2708',
    },
    {
      id: 2901,
      process_number_standard: 'ocds-lcuori-504120DGC-2901',
    },
    {
      id: 2902,
      process_number_standard: 'ocds-lcuori-504120DGC-2902',
    },
    {
      id: 2925,
      process_number_standard: 'ocds-lcuori-504120DGC-2925',
    },
    {
      id: 2903,
      process_number_standard: 'ocds-lcuori-504120DGC-2903',
    },
    {
      id: 2939,
      process_number_standard: 'ocds-lcuori-504120DGC-2939',
    },
    {
      id: 2904,
      process_number_standard: 'ocds-lcuori-504120DGC-2904',
    },
    {
      id: 2927,
      process_number_standard: 'ocds-lcuori-504120DGC-2927',
    },
    {
      id: 2949,
      process_number_standard: 'ocds-lcuori-504120DGC-2949',
    },
    {
      id: 2940,
      process_number_standard: 'ocds-lcuori-504120DGC-2940',
    },
    {
      id: 2958,
      process_number_standard: 'ocds-lcuori-504120DGC-2958',
    },
    {
      id: 2698,
      process_number_standard: 'ocds-lcuori-504120DGC-2698',
    },
    {
      id: 2930,
      process_number_standard: 'ocds-lcuori-504120DGC-2930',
    },
    {
      id: 2908,
      process_number_standard: 'ocds-lcuori-504120DGC-2908',
    },
    {
      id: 2931,
      process_number_standard: 'ocds-lcuori-504120DGC-2931',
    },
    {
      id: 2922,
      process_number_standard: 'ocds-lcuori-504120DGC-2922',
    },
    {
      id: 3713,
      process_number_standard: 'oc4ids-504-120-0003713',
    },
    {
      id: 2932,
      process_number_standard: 'ocds-lcuori-504120DGC-2932',
    },
    {
      id: 3008,
      process_number_standard: 'ocds-lcuori-504120DGC-3008',
    },
    {
      id: 2950,
      process_number_standard: 'ocds-lcuori-504120DGC-2950',
    },
    {
      id: 2926,
      process_number_standard: 'ocds-lcuori-504120DGC-2926',
    },
    {
      id: 2933,
      process_number_standard: 'ocds-lcuori-504120DGC-2933',
    },
    {
      id: 2967,
      process_number_standard: 'ocds-lcuori-504120DGC-2967',
    },
    {
      id: 2694,
      process_number_standard: 'ocds-lcuori-504120DGC-2694',
    },
    {
      id: 2934,
      process_number_standard: 'ocds-lcuori-504120DGC-2934',
    },
    {
      id: 2951,
      process_number_standard: 'ocds-lcuori-504120DGC-2951',
    },
    {
      id: 2928,
      process_number_standard: 'ocds-lcuori-504120DGC-2928',
    },
    {
      id: 2941,
      process_number_standard: 'ocds-lcuori-504120DGC-2941',
    },
    {
      id: 2929,
      process_number_standard: 'ocds-lcuori-504120DGC-2929',
    },
    {
      id: 2942,
      process_number_standard: 'ocds-lcuori-504120DGC-2942',
    },
    {
      id: 2952,
      process_number_standard: 'ocds-lcuori-504120DGC-2952',
    },
    {
      id: 2935,
      process_number_standard: 'ocds-lcuori-504120DGC-2935',
    },
    {
      id: 2936,
      process_number_standard: 'ocds-lcuori-504120DGC-2936',
    },
    {
      id: 2943,
      process_number_standard: 'ocds-lcuori-504120DGC-2943',
    },
    {
      id: 3001,
      process_number_standard: 'ocds-lcuori-504120DGC-3001',
    },
    {
      id: 2702,
      process_number_standard: 'ocds-lcuori-504120DGC-2702',
    },
    {
      id: 3009,
      process_number_standard: 'ocds-lcuori-504120DGC-3009',
    },
    {
      id: 2944,
      process_number_standard: 'ocds-lcuori-504120DGC-2944',
    },
    {
      id: 3010,
      process_number_standard: 'ocds-lcuori-504120DGC-3010',
    },
    {
      id: 3011,
      process_number_standard: 'ocds-lcuori-504120DGC-3011',
    },
    {
      id: 3012,
      process_number_standard: 'ocds-lcuori-504120DGC-3012',
    },
    {
      id: 2945,
      process_number_standard: 'ocds-lcuori-504120DGC-2945',
    },
    {
      id: 2953,
      process_number_standard: 'ocds-lcuori-504120DGC-2953',
    },
    {
      id: 2946,
      process_number_standard: 'ocds-lcuori-504120DGC-2946',
    },
    {
      id: 2954,
      process_number_standard: 'ocds-lcuori-504120DGC-2954',
    },
    {
      id: 2909,
      process_number_standard: 'ocds-lcuori-504120DGC-2909',
    },
    {
      id: 2695,
      process_number_standard: 'ocds-lcuori-504120DGC-2695',
    },
    {
      id: 2955,
      process_number_standard: 'ocds-lcuori-504120DGC-2955',
    },
    {
      id: 3014,
      process_number_standard: 'ocds-lcuori-504120DGC-3014',
    },
    {
      id: 2947,
      process_number_standard: 'ocds-lcuori-504120DGC-2947',
    },
    {
      id: 3015,
      process_number_standard: 'ocds-lcuori-504120DGC-3015',
    },
    {
      id: 2696,
      process_number_standard: 'ocds-lcuori-504120DGC-2696',
    },
    {
      id: 2875,
      process_number_standard: 'ocds-lcuori-504120DGC-2875',
    },
    {
      id: 2697,
      process_number_standard: 'ocds-lcuori-504120DGC-2697',
    },
    {
      id: 3004,
      process_number_standard: 'ocds-lcuori-504120DGC-3004',
    },
    {
      id: 2703,
      process_number_standard: 'ocds-lcuori-504120DGC-2703',
    },
    {
      id: 2882,
      process_number_standard: 'ocds-lcuori-504120DGC-2882',
    },
    {
      id: 2700,
      process_number_standard: 'ocds-lcuori-504120DGC-2700',
    },
    {
      id: 2876,
      process_number_standard: 'ocds-lcuori-504120DGC-2876',
    },
    {
      id: 2877,
      process_number_standard: 'ocds-lcuori-504120DGC-2877',
    },
    {
      id: 2910,
      process_number_standard: 'ocds-lcuori-504120DGC-2910',
    },
    {
      id: 2701,
      process_number_standard: 'ocds-lcuori-504120DGC-2701',
    },
    {
      id: 2957,
      process_number_standard: 'ocds-lcuori-504120DGC-2957',
    },
    {
      id: 3002,
      process_number_standard: 'ocds-lcuori-504120DGC-3002',
    },
    {
      id: 2959,
      process_number_standard: 'ocds-lcuori-504120DGC-2959',
    },
    {
      id: 2886,
      process_number_standard: 'ocds-lcuori-504120DGC-2886',
    },
    {
      id: 2973,
      process_number_standard: 'ocds-lcuori-504120DGC-2973',
    },
    {
      id: 2878,
      process_number_standard: 'ocds-lcuori-504120DGC-2878',
    },
    {
      id: 2883,
      process_number_standard: 'ocds-lcuori-504120DGC-2883',
    },
    {
      id: 2879,
      process_number_standard: 'ocds-lcuori-504120DGC-2879',
    },
    {
      id: 3003,
      process_number_standard: 'ocds-lcuori-504120DGC-3003',
    },
    {
      id: 2969,
      process_number_standard: 'ocds-lcuori-504120DGC-2969',
    },
    {
      id: 3016,
      process_number_standard: 'ocds-lcuori-504120DGC-3016',
    },
    {
      id: 2937,
      process_number_standard: 'ocds-lcuori-504120DGC-2937',
    },
    {
      id: 2994,
      process_number_standard: 'ocds-lcuori-504120DGC-2994',
    },
    {
      id: 2971,
      process_number_standard: 'ocds-lcuori-504120DGC-2971',
    },
    {
      id: 2938,
      process_number_standard: 'ocds-lcuori-504120DGC-2938',
    },
    {
      id: 2960,
      process_number_standard: 'ocds-lcuori-504120DGC-2960',
    },
    {
      id: 2961,
      process_number_standard: 'ocds-lcuori-504120DGC-2961',
    },
    {
      id: 3017,
      process_number_standard: 'ocds-lcuori-504120DGC-3017',
    },
    {
      id: 2962,
      process_number_standard: 'ocds-lcuori-504120DGC-2962',
    },
    {
      id: 2972,
      process_number_standard: 'ocds-lcuori-504120DGC-2972',
    },
    {
      id: 2996,
      process_number_standard: 'ocds-lcuori-504120DGC-2996',
    },
    {
      id: 3666,
      process_number_standard: 'ocds-lcuori-504120DGOP-3666',
    },
    {
      id: 3667,
      process_number_standard: 'ocds-lcuori-504120DGOP-3667',
    },
    {
      id: 3668,
      process_number_standard: 'ocds-lcuori-504120DGOP-3668',
    },
    {
      id: 3669,
      process_number_standard: 'ocds-lcuori-504120000-3669',
    },
    {
      id: 3670,
      process_number_standard: '120S3-3670',
    },
    {
      id: 3642,
      process_number_standard: 'ocds-lcuori-504120DGC-3642',
    },
    {
      id: 3643,
      process_number_standard: 'ocds-lcuori-504120DGC-3643',
    },
    {
      id: 3727,
      process_number_standard: 'oc4ids-504-120-0003727',
    },
    {
      id: 3676,
      process_number_standard: null,
    },
    {
      id: 3677,
      process_number_standard: null,
    },
    {
      id: 3678,
      process_number_standard: null,
    },
    {
      id: 3679,
      process_number_standard: null,
    },
    {
      id: 3680,
      process_number_standard: null,
    },
    {
      id: 3681,
      process_number_standard: null,
    },
    {
      id: 3682,
      process_number_standard: null,
    },
    {
      id: 3683,
      process_number_standard: null,
    },
    {
      id: 3684,
      process_number_standard: null,
    },
    {
      id: 3685,
      process_number_standard: null,
    },
    {
      id: 3686,
      process_number_standard: 'oc4ids-504-120-6',
    },
    {
      id: 3687,
      process_number_standard: 'oc4ids-504-120-000368',
    },
    {
      id: 3688,
      process_number_standard: 'oc4ids-504-120-368',
    },
    {
      id: 3690,
      process_number_standard: 'oc4ids-504-120-',
    },
    {
      id: 3691,
      process_number_standard: 'oc4ids-504-120-000369',
    },
    {
      id: 3692,
      process_number_standard: 'oc4ids-504-120-0003692',
    },
    {
      id: 3348,
      process_number_standard: 'ocds-lcuori-504120UDEIP-3348',
    },
    {
      id: 3349,
      process_number_standard: 'ocds-lcuori-504120UDEIP-3349',
    },
    {
      id: 3350,
      process_number_standard: 'ocds-lcuori-504120UDEIP-3350',
    },
    {
      id: 3351,
      process_number_standard: 'ocds-lcuori-504120UDEIP-3351',
    },
    {
      id: 3512,
      process_number_standard: 'ocds-lcuori-504120DGOP-3512',
    },
    {
      id: 3358,
      process_number_standard: 'ocds-lcuori-504120DGOP-3358',
    },
    {
      id: 3509,
      process_number_standard: 'ocds-lcuori-504120DGOP-3509',
    },
    {
      id: 3429,
      process_number_standard: 'ocds-lcuori-504120DGOP-3429',
    },
    {
      id: 3299,
      process_number_standard: 'ocds-lcuori-504120DGOP-3299',
    },
    {
      id: 3361,
      process_number_standard: 'ocds-lcuori-504120DGOP-3361',
    },
    {
      id: 3430,
      process_number_standard: 'ocds-lcuori-504120DGOP-3430',
    },
    {
      id: 3353,
      process_number_standard: 'ocds-lcuori-504120DGOP-3353',
    },
    {
      id: 3433,
      process_number_standard: 'ocds-lcuori-504120DGOP-3433',
    },
    {
      id: 3354,
      process_number_standard: 'ocds-lcuori-504120DGOP-3354',
    },
    {
      id: 3435,
      process_number_standard: 'ocds-lcuori-504120DGOP-3435',
    },
    {
      id: 3463,
      process_number_standard: 'ocds-lcuori-504120DGOP-3463',
    },
    {
      id: 3436,
      process_number_standard: 'ocds-lcuori-504120DGOP-3436',
    },
    {
      id: 3437,
      process_number_standard: 'ocds-lcuori-504120DGOP-3437',
    },
    {
      id: 3438,
      process_number_standard: 'ocds-lcuori-504120DGOP-3438',
    },
    {
      id: 3304,
      process_number_standard: 'ocds-lcuori-504120DGOP-3304',
    },
    {
      id: 3268,
      process_number_standard: 'ocds-lcuori-504120DGC-3268',
    },
    {
      id: 3253,
      process_number_standard: 'ocds-lcuori-504120DGC-3253',
    },
    {
      id: 3142,
      process_number_standard: 'ocds-lcuori-504120DGC-3142',
    },
    {
      id: 3265,
      process_number_standard: 'ocds-lcuori-504120DGC-3265',
    },
    {
      id: 3266,
      process_number_standard: 'ocds-lcuori-504120DGC-3266',
    },
    {
      id: 3267,
      process_number_standard: 'ocds-lcuori-504120DGC-3267',
    },
    {
      id: 3252,
      process_number_standard: 'ocds-lcuori-504120DGC-3252',
    },
    {
      id: 3254,
      process_number_standard: 'ocds-lcuori-504120DGC-3254',
    },
    {
      id: 3263,
      process_number_standard: 'ocds-lcuori-504120DGC-3263',
    },
    {
      id: 3264,
      process_number_standard: 'ocds-lcuori-504120DGC-3264',
    },
    {
      id: 2646,
      process_number_standard: 'ocds-lcuori-504120DGC-2646',
    },
    {
      id: 3255,
      process_number_standard: 'ocds-lcuori-504120DGC-3255',
    },
    {
      id: 3256,
      process_number_standard: 'ocds-lcuori-504120DGC-3256',
    },
    {
      id: 3270,
      process_number_standard: 'ocds-lcuori-504120DGC-3270',
    },
    {
      id: 3274,
      process_number_standard: 'ocds-lcuori-504120DGC-3274',
    },
    {
      id: 3257,
      process_number_standard: 'ocds-lcuori-504120DGC-3257',
    },
    {
      id: 3258,
      process_number_standard: 'ocds-lcuori-504120DGC-3258',
    },
    {
      id: 3259,
      process_number_standard: 'ocds-lcuori-504120DGC-3259',
    },
    {
      id: 3260,
      process_number_standard: 'ocds-lcuori-504120DGC-3260',
    },
    {
      id: 3261,
      process_number_standard: 'ocds-lcuori-504120DGC-3261',
    },
    {
      id: 3262,
      process_number_standard: 'ocds-lcuori-504120DGC-3262',
    },
    {
      id: 3271,
      process_number_standard: 'ocds-lcuori-504120DGC-3271',
    },
    {
      id: 3269,
      process_number_standard: 'ocds-lcuori-504120DGC-3269',
    },
    {
      id: 3272,
      process_number_standard: 'ocds-lcuori-504120DGC-3272',
    },
    {
      id: 3273,
      process_number_standard: 'ocds-lcuori-504120DGC-3273',
    },
    {
      id: 3275,
      process_number_standard: 'ocds-lcuori-504120DGC-3275',
    },
    {
      id: 3276,
      process_number_standard: 'ocds-lcuori-504120DGC-3276',
    },
    {
      id: 3277,
      process_number_standard: 'ocds-lcuori-504120DGC-3277',
    },
    {
      id: 3278,
      process_number_standard: 'ocds-lcuori-504120DGC-3278',
    },
    {
      id: 3279,
      process_number_standard: 'ocds-lcuori-504120DGC-3279',
    },
    {
      id: 3280,
      process_number_standard: 'ocds-lcuori-504120DGC-3280',
    },
    {
      id: 3281,
      process_number_standard: 'ocds-lcuori-504120DGC-3281',
    },
    {
      id: 3283,
      process_number_standard: 'ocds-lcuori-504120DGC-3283',
    },
    {
      id: 3284,
      process_number_standard: 'ocds-lcuori-504120DGC-3284',
    },
    {
      id: 3285,
      process_number_standard: 'ocds-lcuori-504120DGC-3285',
    },
    {
      id: 3341,
      process_number_standard: 'ocds-lcuori-504120DGC-3341',
    },
    {
      id: 3027,
      process_number_standard: 'ocds-lcuori-504120DGC-3027',
    },
    {
      id: 3028,
      process_number_standard: 'ocds-lcuori-504120DGC-3028',
    },
    {
      id: 2995,
      process_number_standard: 'ocds-lcuori-504120DGC-2995',
    },
    {
      id: 3620,
      process_number_standard: 'ocds-lcuori-504120DGC-3620',
    },
    {
      id: 3042,
      process_number_standard: 'ocds-lcuori-504120DGC-3042',
    },
    {
      id: 2794,
      process_number_standard: 'ocds-lcuori-504120DGC-2794',
    },
    {
      id: 3631,
      process_number_standard: 'ocds-lcuori-504120DGC-3631',
    },
    {
      id: 3024,
      process_number_standard: 'ocds-lcuori-504120DGC-3024',
    },
    {
      id: 2603,
      process_number_standard: 'ocds-lcuori-504120DGC-2603',
    },
    {
      id: 2582,
      process_number_standard: 'ocds-lcuori-504120DGC-2582',
    },
    {
      id: 2583,
      process_number_standard: 'ocds-lcuori-504120DGC-2583',
    },
    {
      id: 2581,
      process_number_standard: 'ocds-lcuori-504120DGC-2581',
    },
    {
      id: 2622,
      process_number_standard: 'ocds-lcuori-504120DGC-2622',
    },
    {
      id: 2718,
      process_number_standard: 'ocds-lcuori-504120DGC-2718',
    },
    {
      id: 2638,
      process_number_standard: 'ocds-lcuori-504120DGC-2638',
    },
    {
      id: 3018,
      process_number_standard: 'ocds-lcuori-504120DGC-3018',
    },
    {
      id: 2845,
      process_number_standard: 'ocds-lcuori-504120DGC-2845',
    },
    {
      id: 2870,
      process_number_standard: 'ocds-lcuori-504120DGC-2870',
    },
    {
      id: 2869,
      process_number_standard: 'ocds-lcuori-504120DGC-2869',
    },
    {
      id: 2963,
      process_number_standard: 'ocds-lcuori-504120DGC-2963',
    },
    {
      id: 2970,
      process_number_standard: 'ocds-lcuori-504120DGC-2970',
    },
    {
      id: 2956,
      process_number_standard: 'ocds-lcuori-504120DGC-2956',
    },
    {
      id: 3311,
      process_number_standard: 'ocds-lcuori-504120DGC-3311',
    },
    {
      id: 3323,
      process_number_standard: 'ocds-lcuori-504120DGC-3323',
    },
    {
      id: 3327,
      process_number_standard: 'ocds-lcuori-504120DGC-3327',
    },
    {
      id: 3336,
      process_number_standard: 'ocds-lcuori-504120DGC-3336',
    },
    {
      id: 2975,
      process_number_standard: 'ocds-lcuori-504120DGC-2975',
    },
    {
      id: 3443,
      process_number_standard: 'ocds-lcuori-504120DGC-3443',
    },
    {
      id: 2976,
      process_number_standard: 'ocds-lcuori-504120DGC-2976',
    },
    {
      id: 2974,
      process_number_standard: 'ocds-lcuori-504120DGC-2974',
    },
    {
      id: 2977,
      process_number_standard: 'ocds-lcuori-504120DGC-2977',
    },
    {
      id: 2978,
      process_number_standard: 'ocds-lcuori-504120DGC-2978',
    },
    {
      id: 2979,
      process_number_standard: 'ocds-lcuori-504120DGC-2979',
    },
    {
      id: 2980,
      process_number_standard: 'ocds-lcuori-504120DGC-2980',
    },
    {
      id: 3282,
      process_number_standard: 'ocds-lcuori-504120DGOP-3282',
    },
    {
      id: 3289,
      process_number_standard: 'ocds-lcuori-504120DGOP-3289',
    },
    {
      id: 3464,
      process_number_standard: 'ocds-lcuori-504120DGOP-3464',
    },
    {
      id: 3362,
      process_number_standard: 'ocds-lcuori-504120DGOP-3362',
    },
    {
      id: 3465,
      process_number_standard: 'ocds-lcuori-504120DGOP-3465',
    },
    {
      id: 3365,
      process_number_standard: 'ocds-lcuori-504120DGOP-3365',
    },
    {
      id: 3466,
      process_number_standard: 'ocds-lcuori-504120DGOP-3466',
    },
    {
      id: 3366,
      process_number_standard: 'ocds-lcuori-504120DGOP-3366',
    },
    {
      id: 3467,
      process_number_standard: 'ocds-lcuori-504120DGOP-3467',
    },
    {
      id: 3367,
      process_number_standard: 'ocds-lcuori-504120DGOP-3367',
    },
    {
      id: 3468,
      process_number_standard: 'ocds-lcuori-504120DGOP-3468',
    },
    {
      id: 3368,
      process_number_standard: 'ocds-lcuori-504120DGOP-3368',
    },
    {
      id: 3470,
      process_number_standard: 'ocds-lcuori-504120DGOP-3470',
    },
    {
      id: 3369,
      process_number_standard: 'ocds-lcuori-504120DGOP-3369',
    },
    {
      id: 3471,
      process_number_standard: 'ocds-lcuori-504120DGOP-3471',
    },
    {
      id: 3370,
      process_number_standard: 'ocds-lcuori-504120DGOP-3370',
    },
    {
      id: 3371,
      process_number_standard: 'ocds-lcuori-504120DGOP-3371',
    },
    {
      id: 3473,
      process_number_standard: 'ocds-lcuori-504120DGOP-3473',
    },
    {
      id: 3372,
      process_number_standard: 'ocds-lcuori-504120DGOP-3372',
    },
    {
      id: 3510,
      process_number_standard: 'ocds-lcuori-504120DGOP-3510',
    },
    {
      id: 3511,
      process_number_standard: 'ocds-lcuori-504120DGOP-3511',
    },
    {
      id: 3381,
      process_number_standard: 'ocds-lcuori-504120DGOP-3381',
    },
    {
      id: 3472,
      process_number_standard: 'ocds-lcuori-504120DGOP-3472',
    },
    {
      id: 3382,
      process_number_standard: 'ocds-lcuori-504120DGOP-3382',
    },
    {
      id: 3383,
      process_number_standard: 'ocds-lcuori-504120DGOP-3383',
    },
    {
      id: 3384,
      process_number_standard: 'ocds-lcuori-504120DGOP-3384',
    },
    {
      id: 3385,
      process_number_standard: 'ocds-lcuori-504120DGOP-3385',
    },
    {
      id: 3386,
      process_number_standard: 'ocds-lcuori-504120DGOP-3386',
    },
    {
      id: 3387,
      process_number_standard: 'ocds-lcuori-504120DGOP-3387',
    },
    {
      id: 3388,
      process_number_standard: 'ocds-lcuori-504120DGOP-3388',
    },
    {
      id: 3389,
      process_number_standard: 'ocds-lcuori-504120DGOP-3389',
    },
    {
      id: 3390,
      process_number_standard: 'ocds-lcuori-504120DGOP-3390',
    },
    {
      id: 3391,
      process_number_standard: 'ocds-lcuori-504120DGOP-3391',
    },
    {
      id: 3392,
      process_number_standard: 'ocds-lcuori-504120DGOP-3392',
    },
    {
      id: 3393,
      process_number_standard: 'ocds-lcuori-504120DGOP-3393',
    },
    {
      id: 3394,
      process_number_standard: 'ocds-lcuori-504120DGOP-3394',
    },
    {
      id: 3395,
      process_number_standard: 'ocds-lcuori-504120DGOP-3395',
    },
    {
      id: 3396,
      process_number_standard: 'ocds-lcuori-504120DGOP-3396',
    },
    {
      id: 3399,
      process_number_standard: 'ocds-lcuori-504120DGOP-3399',
    },
    {
      id: 3400,
      process_number_standard: 'ocds-lcuori-504120DGOP-3400',
    },
    {
      id: 3401,
      process_number_standard: 'ocds-lcuori-504120DGOP-3401',
    },
    {
      id: 3402,
      process_number_standard: 'ocds-lcuori-504120DGOP-3402',
    },
    {
      id: 3403,
      process_number_standard: 'ocds-lcuori-504120DGOP-3403',
    },
    {
      id: 3404,
      process_number_standard: 'ocds-lcuori-504120DGOP-3404',
    },
    {
      id: 3405,
      process_number_standard: 'ocds-lcuori-504120DGOP-3405',
    },
    {
      id: 3406,
      process_number_standard: 'ocds-lcuori-504120DGOP-3406',
    },
    {
      id: 3407,
      process_number_standard: 'ocds-lcuori-504120DGOP-3407',
    },
    {
      id: 3408,
      process_number_standard: 'ocds-lcuori-504120DGOP-3408',
    },
    {
      id: 3409,
      process_number_standard: 'ocds-lcuori-504120DGOP-3409',
    },
    {
      id: 3410,
      process_number_standard: 'ocds-lcuori-504120DGOP-3410',
    },
    {
      id: 3411,
      process_number_standard: 'ocds-lcuori-504120DGOP-3411',
    },
    {
      id: 3412,
      process_number_standard: 'ocds-lcuori-504120DGOP-3412',
    },
    {
      id: 3413,
      process_number_standard: 'ocds-lcuori-504120DGOP-3413',
    },
    {
      id: 3414,
      process_number_standard: 'ocds-lcuori-504120DGOP-3414',
    },
    {
      id: 3415,
      process_number_standard: 'ocds-lcuori-504120DGOP-3415',
    },
    {
      id: 3416,
      process_number_standard: 'ocds-lcuori-504120DGOP-3416',
    },
    {
      id: 3417,
      process_number_standard: 'ocds-lcuori-504120DGOP-3417',
    },
    {
      id: 3418,
      process_number_standard: 'ocds-lcuori-504120DGOP-3418',
    },
    {
      id: 3419,
      process_number_standard: 'ocds-lcuori-504120DGOP-3419',
    },
    {
      id: 3420,
      process_number_standard: 'ocds-lcuori-504120DGOP-3420',
    },
    {
      id: 3421,
      process_number_standard: 'ocds-lcuori-504120DGOP-3421',
    },
    {
      id: 3422,
      process_number_standard: 'ocds-lcuori-504120DGOP-3422',
    },
    {
      id: 3423,
      process_number_standard: 'ocds-lcuori-504120DGOP-3423',
    },
    {
      id: 3424,
      process_number_standard: 'ocds-lcuori-504120DGOP-3424',
    },
    {
      id: 3425,
      process_number_standard: 'ocds-lcuori-504120DGOP-3425',
    },
    {
      id: 3426,
      process_number_standard: 'ocds-lcuori-504120DGOP-3426',
    },
    {
      id: 3427,
      process_number_standard: 'ocds-lcuori-504120DGOP-3427',
    },
    {
      id: 3428,
      process_number_standard: 'ocds-lcuori-504120DGOP-3428',
    },
    {
      id: 3503,
      process_number_standard: 'ocds-lcuori-504120DGOP-3503',
    },
    {
      id: 3504,
      process_number_standard: 'ocds-lcuori-504120DGOP-3504',
    },
    {
      id: 3500,
      process_number_standard: 'ocds-lcuori-504120DGOP-3500',
    },
    {
      id: 3501,
      process_number_standard: 'ocds-lcuori-504120DGOP-3501',
    },
    {
      id: 3502,
      process_number_standard: 'ocds-lcuori-504120DGOP-3502',
    },
    {
      id: 3505,
      process_number_standard: 'ocds-lcuori-504120DGOP-3505',
    },
    {
      id: 3506,
      process_number_standard: 'ocds-lcuori-504120DGOP-3506',
    },
    {
      id: 3380,
      process_number_standard: 'ocds-lcuori-504120DGOP-3380',
    },
    {
      id: 3352,
      process_number_standard: 'ocds-lcuori-504120DGOP-3352',
    },
    {
      id: 3507,
      process_number_standard: 'ocds-lcuori-504120DGOP-3507',
    },
    {
      id: 3355,
      process_number_standard: 'ocds-lcuori-504120DGOP-3355',
    },
    {
      id: 3356,
      process_number_standard: 'ocds-lcuori-504120DGOP-3356',
    },
    {
      id: 3357,
      process_number_standard: 'ocds-lcuori-504120DGOP-3357',
    },
    {
      id: 3497,
      process_number_standard: 'ocds-lcuori-504120DGOP-3497',
    },
    {
      id: 3498,
      process_number_standard: 'ocds-lcuori-504120DGOP-3498',
    },
    {
      id: 3342,
      process_number_standard: 'ocds-lcuori-504120DGOP-3342',
    },
    {
      id: 3343,
      process_number_standard: 'ocds-lcuori-504120DGOP-3343',
    },
    {
      id: 3359,
      process_number_standard: 'ocds-lcuori-504120DGOP-3359',
    },
    {
      id: 2609,
      process_number_standard: 'ocds-lcuori-504120DGC-2609',
    },
    {
      id: 2692,
      process_number_standard: 'ocds-lcuori-504120DGC-2692',
    },
    {
      id: 2799,
      process_number_standard: 'ocds-lcuori-504120DGC-2799',
    },
    {
      id: 3098,
      process_number_standard: 'ocds-lcuori-504120DGC-3098',
    },
    {
      id: 3101,
      process_number_standard: 'ocds-lcuori-504120DGC-3101',
    },
    {
      id: 3102,
      process_number_standard: 'ocds-lcuori-504120DGC-3102',
    },
    {
      id: 3104,
      process_number_standard: 'ocds-lcuori-504120DGC-3104',
    },
    {
      id: 3099,
      process_number_standard: 'ocds-lcuori-504120DGC-3099',
    },
    {
      id: 3078,
      process_number_standard: 'ocds-lcuori-504120DGC-3078',
    },
    {
      id: 3079,
      process_number_standard: 'ocds-lcuori-504120DGC-3079',
    },
    {
      id: 3080,
      process_number_standard: 'ocds-lcuori-504120DGC-3080',
    },
    {
      id: 3081,
      process_number_standard: 'ocds-lcuori-504120DGC-3081',
    },
    {
      id: 3082,
      process_number_standard: 'ocds-lcuori-504120DGC-3082',
    },
    {
      id: 3083,
      process_number_standard: 'ocds-lcuori-504120DGC-3083',
    },
    {
      id: 3084,
      process_number_standard: 'ocds-lcuori-504120DGC-3084',
    },
    {
      id: 3085,
      process_number_standard: 'ocds-lcuori-504120DGC-3085',
    },
    {
      id: 3086,
      process_number_standard: 'ocds-lcuori-504120DGC-3086',
    },
    {
      id: 3087,
      process_number_standard: 'ocds-lcuori-504120DGC-3087',
    },
    {
      id: 3088,
      process_number_standard: 'ocds-lcuori-504120DGC-3088',
    },
    {
      id: 3090,
      process_number_standard: 'ocds-lcuori-504120DGC-3090',
    },
    {
      id: 3089,
      process_number_standard: 'ocds-lcuori-504120DGC-3089',
    },
    {
      id: 3091,
      process_number_standard: 'ocds-lcuori-504120DGC-3091',
    },
    {
      id: 3092,
      process_number_standard: 'ocds-lcuori-504120DGC-3092',
    },
    {
      id: 3093,
      process_number_standard: 'ocds-lcuori-504120DGC-3093',
    },
    {
      id: 3094,
      process_number_standard: 'ocds-lcuori-504120DGC-3094',
    },
    {
      id: 3100,
      process_number_standard: 'ocds-lcuori-504120DGC-3100',
    },
    {
      id: 3095,
      process_number_standard: 'ocds-lcuori-504120DGC-3095',
    },
    {
      id: 3096,
      process_number_standard: 'ocds-lcuori-504120DGC-3096',
    },
    {
      id: 3097,
      process_number_standard: 'ocds-lcuori-504120DGC-3097',
    },
    {
      id: 3103,
      process_number_standard: 'ocds-lcuori-504120DGC-3103',
    },
    {
      id: 3105,
      process_number_standard: 'ocds-lcuori-504120DGC-3105',
    },
    {
      id: 3106,
      process_number_standard: 'ocds-lcuori-504120DGC-3106',
    },
    {
      id: 3107,
      process_number_standard: 'ocds-lcuori-504120DGC-3107',
    },
    {
      id: 3108,
      process_number_standard: 'ocds-lcuori-504120DGC-3108',
    },
    {
      id: 3112,
      process_number_standard: 'ocds-lcuori-504120DGC-3112',
    },
    {
      id: 3109,
      process_number_standard: 'ocds-lcuori-504120DGC-3109',
    },
    {
      id: 3110,
      process_number_standard: 'ocds-lcuori-504120DGC-3110',
    },
    {
      id: 3111,
      process_number_standard: 'ocds-lcuori-504120DGC-3111',
    },
    {
      id: 3113,
      process_number_standard: 'ocds-lcuori-504120DGC-3113',
    },
    {
      id: 3114,
      process_number_standard: 'ocds-lcuori-504120DGC-3114',
    },
    {
      id: 3115,
      process_number_standard: 'ocds-lcuori-504120DGC-3115',
    },
    {
      id: 3116,
      process_number_standard: 'ocds-lcuori-504120DGC-3116',
    },
    {
      id: 3117,
      process_number_standard: 'ocds-lcuori-504120DGC-3117',
    },
    {
      id: 3118,
      process_number_standard: 'ocds-lcuori-504120DGC-3118',
    },
    {
      id: 3119,
      process_number_standard: 'ocds-lcuori-504120DGC-3119',
    },
    {
      id: 3547,
      process_number_standard: 'ocds-lcuori-504120DGC-3547',
    },
    {
      id: 3548,
      process_number_standard: 'ocds-lcuori-504120DGC-3548',
    },
    {
      id: 3549,
      process_number_standard: 'ocds-lcuori-504120DGC-3549',
    },
    {
      id: 3550,
      process_number_standard: 'ocds-lcuori-504120DGC-3550',
    },
    {
      id: 3551,
      process_number_standard: 'ocds-lcuori-504120DGC-3551',
    },
    {
      id: 3552,
      process_number_standard: 'ocds-lcuori-504120DGC-3552',
    },
    {
      id: 3553,
      process_number_standard: 'ocds-lcuori-504120DGC-3553',
    },
    {
      id: 3554,
      process_number_standard: 'ocds-lcuori-504120DGC-3554',
    },
    {
      id: 3555,
      process_number_standard: 'ocds-lcuori-504120DGC-3555',
    },
    {
      id: 3556,
      process_number_standard: 'ocds-lcuori-504120DGC-3556',
    },
    {
      id: 3557,
      process_number_standard: 'ocds-lcuori-504120DGC-3557',
    },
    {
      id: 3558,
      process_number_standard: 'ocds-lcuori-504120DGC-3558',
    },
    {
      id: 3559,
      process_number_standard: 'ocds-lcuori-504120DGC-3559',
    },
    {
      id: 3560,
      process_number_standard: 'ocds-lcuori-504120DGC-3560',
    },
    {
      id: 3561,
      process_number_standard: 'ocds-lcuori-504120DGC-3561',
    },
    {
      id: 3608,
      process_number_standard: 'ocds-lcuori-504120DGC-3608',
    },
    {
      id: 3562,
      process_number_standard: 'ocds-lcuori-504120DGC-3562',
    },
    {
      id: 3563,
      process_number_standard: 'ocds-lcuori-504120DGC-3563',
    },
    {
      id: 3591,
      process_number_standard: 'ocds-lcuori-504120DGC-3591',
    },
    {
      id: 3564,
      process_number_standard: 'ocds-lcuori-504120DGC-3564',
    },
    {
      id: 3565,
      process_number_standard: 'ocds-lcuori-504120DGC-3565',
    },
    {
      id: 3566,
      process_number_standard: 'ocds-lcuori-504120DGC-3566',
    },
    {
      id: 3567,
      process_number_standard: 'ocds-lcuori-504120DGC-3567',
    },
    {
      id: 3568,
      process_number_standard: 'ocds-lcuori-504120DGC-3568',
    },
    {
      id: 3570,
      process_number_standard: 'ocds-lcuori-504120DGC-3570',
    },
    {
      id: 3569,
      process_number_standard: 'ocds-lcuori-504120DGC-3569',
    },
    {
      id: 3571,
      process_number_standard: 'ocds-lcuori-504120DGC-3571',
    },
    {
      id: 3572,
      process_number_standard: 'ocds-lcuori-504120DGC-3572',
    },
    {
      id: 3573,
      process_number_standard: 'ocds-lcuori-504120DGC-3573',
    },
    {
      id: 3574,
      process_number_standard: 'ocds-lcuori-504120DGC-3574',
    },
    {
      id: 3575,
      process_number_standard: 'ocds-lcuori-504120DGC-3575',
    },
    {
      id: 3576,
      process_number_standard: 'ocds-lcuori-504120DGC-3576',
    },
    {
      id: 3577,
      process_number_standard: 'ocds-lcuori-504120DGC-3577',
    },
    {
      id: 3578,
      process_number_standard: 'ocds-lcuori-504120DGC-3578',
    },
    {
      id: 3579,
      process_number_standard: 'ocds-lcuori-504120DGC-3579',
    },
    {
      id: 3580,
      process_number_standard: 'ocds-lcuori-504120DGC-3580',
    },
    {
      id: 3581,
      process_number_standard: 'ocds-lcuori-504120DGC-3581',
    },
    {
      id: 3582,
      process_number_standard: 'ocds-lcuori-504120DGC-3582',
    },
    {
      id: 3586,
      process_number_standard: 'ocds-lcuori-504120DGC-3586',
    },
    {
      id: 3587,
      process_number_standard: 'ocds-lcuori-504120DGC-3587',
    },
    {
      id: 3583,
      process_number_standard: 'ocds-lcuori-504120DGC-3583',
    },
    {
      id: 3584,
      process_number_standard: 'ocds-lcuori-504120DGC-3584',
    },
    {
      id: 3585,
      process_number_standard: 'ocds-lcuori-504120DGC-3585',
    },
    {
      id: 3588,
      process_number_standard: 'ocds-lcuori-504120DGC-3588',
    },
    {
      id: 3589,
      process_number_standard: 'ocds-lcuori-504120DGC-3589',
    },
    {
      id: 3590,
      process_number_standard: 'ocds-lcuori-504120DGC-3590',
    },
    {
      id: 3592,
      process_number_standard: 'ocds-lcuori-504120DGC-3592',
    },
    {
      id: 3593,
      process_number_standard: 'ocds-lcuori-504120DGC-3593',
    },
    {
      id: 3594,
      process_number_standard: 'ocds-lcuori-504120DGC-3594',
    },
    {
      id: 3595,
      process_number_standard: 'ocds-lcuori-504120DGC-3595',
    },
    {
      id: 3596,
      process_number_standard: 'ocds-lcuori-504120DGC-3596',
    },
    {
      id: 3597,
      process_number_standard: 'ocds-lcuori-504120DGC-3597',
    },
    {
      id: 3598,
      process_number_standard: 'ocds-lcuori-504120DGC-3598',
    },
    {
      id: 3599,
      process_number_standard: 'ocds-lcuori-504120DGC-3599',
    },
    {
      id: 3601,
      process_number_standard: 'ocds-lcuori-504120DGC-3601',
    },
    {
      id: 3602,
      process_number_standard: 'ocds-lcuori-504120DGC-3602',
    },
    {
      id: 3603,
      process_number_standard: 'ocds-lcuori-504120DGC-3603',
    },
    {
      id: 3604,
      process_number_standard: 'ocds-lcuori-504120DGC-3604',
    },
    {
      id: 3605,
      process_number_standard: 'ocds-lcuori-504120DGC-3605',
    },
    {
      id: 3606,
      process_number_standard: 'ocds-lcuori-504120DGC-3606',
    },
    {
      id: 3607,
      process_number_standard: 'ocds-lcuori-504120DGC-3607',
    },
    {
      id: 3609,
      process_number_standard: 'ocds-lcuori-504120DGC-3609',
    },
    {
      id: 3610,
      process_number_standard: 'ocds-lcuori-504120DGC-3610',
    },
    {
      id: 3611,
      process_number_standard: 'ocds-lcuori-504120DGC-3611',
    },
    {
      id: 3612,
      process_number_standard: 'ocds-lcuori-504120DGC-3612',
    },
    {
      id: 3613,
      process_number_standard: 'ocds-lcuori-504120DGC-3613',
    },
    {
      id: 3614,
      process_number_standard: 'ocds-lcuori-504120DGC-3614',
    },
    {
      id: 3615,
      process_number_standard: 'ocds-lcuori-504120DGC-3615',
    },
    {
      id: 3616,
      process_number_standard: 'ocds-lcuori-504120DGC-3616',
    },
    {
      id: 3617,
      process_number_standard: 'ocds-lcuori-504120DGC-3617',
    },
    {
      id: 3618,
      process_number_standard: 'ocds-lcuori-504120DGC-3618',
    },
    {
      id: 3619,
      process_number_standard: 'ocds-lcuori-504120DGC-3619',
    },
    {
      id: 3621,
      process_number_standard: 'ocds-lcuori-504120DGC-3621',
    },
    {
      id: 3622,
      process_number_standard: 'ocds-lcuori-504120DGC-3622',
    },
    {
      id: 3623,
      process_number_standard: 'ocds-lcuori-504120DGC-3623',
    },
    {
      id: 3624,
      process_number_standard: 'ocds-lcuori-504120DGC-3624',
    },
    {
      id: 3625,
      process_number_standard: 'ocds-lcuori-504120DGC-3625',
    },
    {
      id: 3626,
      process_number_standard: 'ocds-lcuori-504120DGC-3626',
    },
    {
      id: 3627,
      process_number_standard: 'ocds-lcuori-504120DGC-3627',
    },
    {
      id: 3628,
      process_number_standard: 'ocds-lcuori-504120DGC-3628',
    },
    {
      id: 3360,
      process_number_standard: 'ocds-lcuori-504120DGC-3360',
    },
    {
      id: 3629,
      process_number_standard: 'ocds-lcuori-504120DGC-3629',
    },
    {
      id: 3630,
      process_number_standard: 'ocds-lcuori-504120DGC-3630',
    },
    {
      id: 3632,
      process_number_standard: 'ocds-lcuori-504120DGC-3632',
    },
    {
      id: 3633,
      process_number_standard: 'ocds-lcuori-504120DGC-3633',
    },
    {
      id: 3635,
      process_number_standard: 'ocds-lcuori-504120DGC-3635',
    },
    {
      id: 3636,
      process_number_standard: 'ocds-lcuori-504120DGC-3636',
    },
    {
      id: 3514,
      process_number_standard: 'ocds-lcuori-504120DGC-3514',
    },
    {
      id: 3439,
      process_number_standard: 'ocds-lcuori-504120DGC-3439',
    },
    {
      id: 3363,
      process_number_standard: 'ocds-lcuori-504120DGC-3363',
    },
    {
      id: 3364,
      process_number_standard: 'ocds-lcuori-504120DGC-3364',
    },
    {
      id: 3338,
      process_number_standard: 'ocds-lcuori-504120DGC-3338',
    },
    {
      id: 3440,
      process_number_standard: 'ocds-lcuori-504120DGC-3440',
    },
    {
      id: 3286,
      process_number_standard: 'ocds-lcuori-504120DGC-3286',
    },
    {
      id: 3287,
      process_number_standard: 'ocds-lcuori-504120DGC-3287',
    },
    {
      id: 3525,
      process_number_standard: 'ocds-lcuori-504120DGC-3525',
    },
    {
      id: 3373,
      process_number_standard: 'ocds-lcuori-504120DGC-3373',
    },
    {
      id: 3374,
      process_number_standard: 'ocds-lcuori-504120DGC-3374',
    },
    {
      id: 3375,
      process_number_standard: 'ocds-lcuori-504120DGC-3375',
    },
    {
      id: 3376,
      process_number_standard: 'ocds-lcuori-504120DGC-3376',
    },
    {
      id: 3377,
      process_number_standard: 'ocds-lcuori-504120DGC-3377',
    },
    {
      id: 3318,
      process_number_standard: 'ocds-lcuori-504120DGC-3318',
    },
    {
      id: 3492,
      process_number_standard: 'ocds-lcuori-504120DGC-3492',
    },
    {
      id: 3526,
      process_number_standard: 'ocds-lcuori-504120DGC-3526',
    },
    {
      id: 3540,
      process_number_standard: 'ocds-lcuori-504120DGC-3540',
    },
    {
      id: 3527,
      process_number_standard: 'ocds-lcuori-504120DGC-3527',
    },
    {
      id: 3490,
      process_number_standard: 'ocds-lcuori-504120DGC-3490',
    },
    {
      id: 3378,
      process_number_standard: 'ocds-lcuori-504120DGC-3378',
    },
    {
      id: 3379,
      process_number_standard: 'ocds-lcuori-504120DGC-3379',
    },
    {
      id: 3444,
      process_number_standard: 'ocds-lcuori-504120DGC-3444',
    },
    {
      id: 3312,
      process_number_standard: 'ocds-lcuori-504120DGC-3312',
    },
    {
      id: 3469,
      process_number_standard: 'ocds-lcuori-504120DGC-3469',
    },
    {
      id: 3397,
      process_number_standard: 'ocds-lcuori-504120DGC-3397',
    },
    {
      id: 3398,
      process_number_standard: 'ocds-lcuori-504120DGC-3398',
    },
    {
      id: 3431,
      process_number_standard: 'ocds-lcuori-504120DGC-3431',
    },
    {
      id: 3432,
      process_number_standard: 'ocds-lcuori-504120DGC-3432',
    },
    {
      id: 3434,
      process_number_standard: 'ocds-lcuori-504120DGC-3434',
    },
    {
      id: 3337,
      process_number_standard: 'ocds-lcuori-504120DGC-3337',
    },
    {
      id: 3288,
      process_number_standard: 'ocds-lcuori-504120DGC-3288',
    },
    {
      id: 3441,
      process_number_standard: 'ocds-lcuori-504120DGC-3441',
    },
    {
      id: 3442,
      process_number_standard: 'ocds-lcuori-504120DGC-3442',
    },
    {
      id: 3445,
      process_number_standard: 'ocds-lcuori-504120DGC-3445',
    },
    {
      id: 3446,
      process_number_standard: 'ocds-lcuori-504120DGC-3446',
    },
    {
      id: 3325,
      process_number_standard: 'ocds-lcuori-504120DGC-3325',
    },
    {
      id: 3447,
      process_number_standard: 'ocds-lcuori-504120DGC-3447',
    },
    {
      id: 3326,
      process_number_standard: 'ocds-lcuori-504120DGC-3326',
    },
    {
      id: 3335,
      process_number_standard: 'ocds-lcuori-504120DGC-3335',
    },
    {
      id: 3448,
      process_number_standard: 'ocds-lcuori-504120DGC-3448',
    },
    {
      id: 3292,
      process_number_standard: 'ocds-lcuori-504120DGC-3292',
    },
    {
      id: 3461,
      process_number_standard: 'ocds-lcuori-504120DGC-3461',
    },
    {
      id: 3449,
      process_number_standard: 'ocds-lcuori-504120DGC-3449',
    },
    {
      id: 3528,
      process_number_standard: 'ocds-lcuori-504120DGC-3528',
    },
    {
      id: 3450,
      process_number_standard: 'ocds-lcuori-504120DGC-3450',
    },
    {
      id: 3451,
      process_number_standard: 'ocds-lcuori-504120DGC-3451',
    },
    {
      id: 3452,
      process_number_standard: 'ocds-lcuori-504120DGC-3452',
    },
    {
      id: 3529,
      process_number_standard: 'ocds-lcuori-504120DGC-3529',
    },
    {
      id: 3457,
      process_number_standard: 'ocds-lcuori-504120DGC-3457',
    },
    {
      id: 3328,
      process_number_standard: 'ocds-lcuori-504120DGC-3328',
    },
    {
      id: 3290,
      process_number_standard: 'ocds-lcuori-504120DGC-3290',
    },
    {
      id: 3487,
      process_number_standard: 'ocds-lcuori-504120DGC-3487',
    },
    {
      id: 3291,
      process_number_standard: 'ocds-lcuori-504120DGC-3291',
    },
    {
      id: 3458,
      process_number_standard: 'ocds-lcuori-504120DGC-3458',
    },
    {
      id: 3459,
      process_number_standard: 'ocds-lcuori-504120DGC-3459',
    },
    {
      id: 3530,
      process_number_standard: 'ocds-lcuori-504120DGC-3530',
    },
    {
      id: 3531,
      process_number_standard: 'ocds-lcuori-504120DGC-3531',
    },
    {
      id: 3494,
      process_number_standard: 'ocds-lcuori-504120DGC-3494',
    },
    {
      id: 3293,
      process_number_standard: 'ocds-lcuori-504120DGC-3293',
    },
    {
      id: 3324,
      process_number_standard: 'ocds-lcuori-504120DGC-3324',
    },
    {
      id: 3493,
      process_number_standard: 'ocds-lcuori-504120DGC-3493',
    },
    {
      id: 3495,
      process_number_standard: 'ocds-lcuori-504120DGC-3495',
    },
    {
      id: 3532,
      process_number_standard: 'ocds-lcuori-504120DGC-3532',
    },
    {
      id: 3339,
      process_number_standard: 'ocds-lcuori-504120DGC-3339',
    },
    {
      id: 3340,
      process_number_standard: 'ocds-lcuori-504120DGC-3340',
    },
    {
      id: 3496,
      process_number_standard: 'ocds-lcuori-504120DGC-3496',
    },
    {
      id: 3344,
      process_number_standard: 'ocds-lcuori-504120DGC-3344',
    },
    {
      id: 3294,
      process_number_standard: 'ocds-lcuori-504120DGC-3294',
    },
    {
      id: 3453,
      process_number_standard: 'ocds-lcuori-504120DGC-3453',
    },
    {
      id: 3454,
      process_number_standard: 'ocds-lcuori-504120DGC-3454',
    },
    {
      id: 3455,
      process_number_standard: 'ocds-lcuori-504120DGC-3455',
    },
    {
      id: 3533,
      process_number_standard: 'ocds-lcuori-504120DGC-3533',
    },
    {
      id: 3456,
      process_number_standard: 'ocds-lcuori-504120DGC-3456',
    },
    {
      id: 3306,
      process_number_standard: 'ocds-lcuori-504120DGC-3306',
    },
    {
      id: 3345,
      process_number_standard: 'ocds-lcuori-504120DGC-3345',
    },
    {
      id: 3346,
      process_number_standard: 'ocds-lcuori-504120DGC-3346',
    },
    {
      id: 3460,
      process_number_standard: 'ocds-lcuori-504120DGC-3460',
    },
    {
      id: 3319,
      process_number_standard: 'ocds-lcuori-504120DGC-3319',
    },
    {
      id: 3491,
      process_number_standard: 'ocds-lcuori-504120DGC-3491',
    },
    {
      id: 3300,
      process_number_standard: 'ocds-lcuori-504120DGC-3300',
    },
    {
      id: 3462,
      process_number_standard: 'ocds-lcuori-504120DGC-3462',
    },
    {
      id: 3534,
      process_number_standard: 'ocds-lcuori-504120DGC-3534',
    },
    {
      id: 3347,
      process_number_standard: 'ocds-lcuori-504120DGC-3347',
    },
    {
      id: 3535,
      process_number_standard: 'ocds-lcuori-504120DGC-3535',
    },
    {
      id: 3474,
      process_number_standard: 'ocds-lcuori-504120DGC-3474',
    },
    {
      id: 3475,
      process_number_standard: 'ocds-lcuori-504120DGC-3475',
    },
    {
      id: 3307,
      process_number_standard: 'ocds-lcuori-504120DGC-3307',
    },
    {
      id: 3476,
      process_number_standard: 'ocds-lcuori-504120DGC-3476',
    },
    {
      id: 3477,
      process_number_standard: 'ocds-lcuori-504120DGC-3477',
    },
    {
      id: 3537,
      process_number_standard: 'ocds-lcuori-504120DGC-3537',
    },
    {
      id: 3332,
      process_number_standard: 'ocds-lcuori-504120DGC-3332',
    },
    {
      id: 3539,
      process_number_standard: 'ocds-lcuori-504120DGC-3539',
    },
    {
      id: 3538,
      process_number_standard: 'ocds-lcuori-504120DGC-3538',
    },
    {
      id: 3308,
      process_number_standard: 'ocds-lcuori-504120DGC-3308',
    },
    {
      id: 3309,
      process_number_standard: 'ocds-lcuori-504120DGC-3309',
    },
    {
      id: 3320,
      process_number_standard: 'ocds-lcuori-504120DGC-3320',
    },
    {
      id: 3541,
      process_number_standard: 'ocds-lcuori-504120DGC-3541',
    },
    {
      id: 3310,
      process_number_standard: 'ocds-lcuori-504120DGC-3310',
    },
    {
      id: 3317,
      process_number_standard: 'ocds-lcuori-504120DGC-3317',
    },
    {
      id: 3478,
      process_number_standard: 'ocds-lcuori-504120DGC-3478',
    },
    {
      id: 3542,
      process_number_standard: 'ocds-lcuori-504120DGC-3542',
    },
    {
      id: 3479,
      process_number_standard: 'ocds-lcuori-504120DGC-3479',
    },
    {
      id: 3480,
      process_number_standard: 'ocds-lcuori-504120DGC-3480',
    },
    {
      id: 3488,
      process_number_standard: 'ocds-lcuori-504120DGC-3488',
    },
    {
      id: 3295,
      process_number_standard: 'ocds-lcuori-504120DGC-3295',
    },
    {
      id: 3543,
      process_number_standard: 'ocds-lcuori-504120DGC-3543',
    },
    {
      id: 3544,
      process_number_standard: 'ocds-lcuori-504120DGC-3544',
    },
    {
      id: 3296,
      process_number_standard: 'ocds-lcuori-504120DGC-3296',
    },
    {
      id: 3481,
      process_number_standard: 'ocds-lcuori-504120DGC-3481',
    },
    {
      id: 3536,
      process_number_standard: 'ocds-lcuori-504120DGC-3536',
    },
    {
      id: 3482,
      process_number_standard: 'ocds-lcuori-504120DGC-3482',
    },
    {
      id: 3333,
      process_number_standard: 'ocds-lcuori-504120DGC-3333',
    },
    {
      id: 3297,
      process_number_standard: 'ocds-lcuori-504120DGC-3297',
    },
    {
      id: 3483,
      process_number_standard: 'ocds-lcuori-504120DGC-3483',
    },
    {
      id: 3485,
      process_number_standard: 'ocds-lcuori-504120DGC-3485',
    },
    {
      id: 3484,
      process_number_standard: 'ocds-lcuori-504120DGC-3484',
    },
    {
      id: 3298,
      process_number_standard: 'ocds-lcuori-504120DGC-3298',
    },
    {
      id: 3486,
      process_number_standard: 'ocds-lcuori-504120DGC-3486',
    },
    {
      id: 3301,
      process_number_standard: 'ocds-lcuori-504120DGC-3301',
    },
    {
      id: 3302,
      process_number_standard: 'ocds-lcuori-504120DGC-3302',
    },
    {
      id: 3303,
      process_number_standard: 'ocds-lcuori-504120DGC-3303',
    },
    {
      id: 3305,
      process_number_standard: 'ocds-lcuori-504120DGC-3305',
    },
    {
      id: 3515,
      process_number_standard: 'ocds-lcuori-504120DGC-3515',
    },
    {
      id: 3516,
      process_number_standard: 'ocds-lcuori-504120DGC-3516',
    },
    {
      id: 3313,
      process_number_standard: 'ocds-lcuori-504120DGC-3313',
    },
    {
      id: 3314,
      process_number_standard: 'ocds-lcuori-504120DGC-3314',
    },
    {
      id: 3315,
      process_number_standard: 'ocds-lcuori-504120DGC-3315',
    },
    {
      id: 3517,
      process_number_standard: 'ocds-lcuori-504120DGC-3517',
    },
    {
      id: 3316,
      process_number_standard: 'ocds-lcuori-504120DGC-3316',
    },
    {
      id: 3489,
      process_number_standard: 'ocds-lcuori-504120DGC-3489',
    },
    {
      id: 3321,
      process_number_standard: 'ocds-lcuori-504120DGC-3321',
    },
    {
      id: 3322,
      process_number_standard: 'ocds-lcuori-504120DGC-3322',
    },
    {
      id: 3518,
      process_number_standard: 'ocds-lcuori-504120DGC-3518',
    },
    {
      id: 3513,
      process_number_standard: 'ocds-lcuori-504120DGC-3513',
    },
    {
      id: 3519,
      process_number_standard: 'ocds-lcuori-504120DGC-3519',
    },
    {
      id: 3329,
      process_number_standard: 'ocds-lcuori-504120DGC-3329',
    },
    {
      id: 3330,
      process_number_standard: 'ocds-lcuori-504120DGC-3330',
    },
    {
      id: 3545,
      process_number_standard: 'ocds-lcuori-504120DGC-3545',
    },
    {
      id: 3520,
      process_number_standard: 'ocds-lcuori-504120DGC-3520',
    },
    {
      id: 3521,
      process_number_standard: 'ocds-lcuori-504120DGC-3521',
    },
    {
      id: 3334,
      process_number_standard: 'ocds-lcuori-504120DGC-3334',
    },
    {
      id: 3522,
      process_number_standard: 'ocds-lcuori-504120DGC-3522',
    },
    {
      id: 3523,
      process_number_standard: 'ocds-lcuori-504120DGC-3523',
    },
    {
      id: 3546,
      process_number_standard: 'ocds-lcuori-504120DGC-3546',
    },
    {
      id: 3524,
      process_number_standard: 'ocds-lcuori-504120DGC-3524',
    },
    {
      id: 3331,
      process_number_standard: 'ocds-lcuori-504120DGC-3331',
    },
    {
      id: 3041,
      process_number_standard: 'ocds-lcuori-504120DGC-3041',
    },
    {
      id: 3043,
      process_number_standard: 'ocds-lcuori-504120DGC-3043',
    },
    {
      id: 3049,
      process_number_standard: 'ocds-lcuori-504120DGC-3049',
    },
    {
      id: 3050,
      process_number_standard: 'ocds-lcuori-504120DGC-3050',
    },
    {
      id: 3057,
      process_number_standard: 'ocds-lcuori-504120DGC-3057',
    },
    {
      id: 3058,
      process_number_standard: 'ocds-lcuori-504120DGC-3058',
    },
    {
      id: 3059,
      process_number_standard: 'ocds-lcuori-504120DGC-3059',
    },
    {
      id: 3076,
      process_number_standard: 'ocds-lcuori-504120DGC-3076',
    },
    {
      id: 3077,
      process_number_standard: 'ocds-lcuori-504120DGC-3077',
    },
    {
      id: 3060,
      process_number_standard: 'ocds-lcuori-504120DGC-3060',
    },
    {
      id: 3061,
      process_number_standard: 'ocds-lcuori-504120DGC-3061',
    },
    {
      id: 3075,
      process_number_standard: 'ocds-lcuori-504120DGC-3075',
    },
    {
      id: 3062,
      process_number_standard: 'ocds-lcuori-504120DGC-3062',
    },
    {
      id: 3063,
      process_number_standard: 'ocds-lcuori-504120DGC-3063',
    },
    {
      id: 3064,
      process_number_standard: 'ocds-lcuori-504120DGC-3064',
    },
    {
      id: 3065,
      process_number_standard: 'ocds-lcuori-504120DGC-3065',
    },
    {
      id: 3066,
      process_number_standard: 'ocds-lcuori-504120DGC-3066',
    },
    {
      id: 3067,
      process_number_standard: 'ocds-lcuori-504120DGC-3067',
    },
    {
      id: 3069,
      process_number_standard: 'ocds-lcuori-504120DGC-3069',
    },
    {
      id: 3070,
      process_number_standard: 'ocds-lcuori-504120DGC-3070',
    },
    {
      id: 3071,
      process_number_standard: 'ocds-lcuori-504120DGC-3071',
    },
    {
      id: 3072,
      process_number_standard: 'ocds-lcuori-504120DGC-3072',
    },
    {
      id: 3073,
      process_number_standard: 'ocds-lcuori-504120DGC-3073',
    },
    {
      id: 3074,
      process_number_standard: 'ocds-lcuori-504120DGC-3074',
    },
    {
      id: 3029,
      process_number_standard: 'ocds-lcuori-504120DGC-3029',
    },
    {
      id: 3032,
      process_number_standard: 'ocds-lcuori-504120DGC-3032',
    },
    {
      id: 3033,
      process_number_standard: 'ocds-lcuori-504120DGC-3033',
    },
    {
      id: 3034,
      process_number_standard: 'ocds-lcuori-504120DGC-3034',
    },
    {
      id: 3035,
      process_number_standard: 'ocds-lcuori-504120DGC-3035',
    },
    {
      id: 3036,
      process_number_standard: 'ocds-lcuori-504120DGC-3036',
    },
    {
      id: 3037,
      process_number_standard: 'ocds-lcuori-504120DGC-3037',
    },
    {
      id: 3038,
      process_number_standard: 'ocds-lcuori-504120DGC-3038',
    },
    {
      id: 3039,
      process_number_standard: 'ocds-lcuori-504120DGC-3039',
    },
    {
      id: 3040,
      process_number_standard: 'ocds-lcuori-504120DGC-3040',
    },
    {
      id: 3044,
      process_number_standard: 'ocds-lcuori-504120DGC-3044',
    },
    {
      id: 3045,
      process_number_standard: 'ocds-lcuori-504120DGC-3045',
    },
    {
      id: 3046,
      process_number_standard: 'ocds-lcuori-504120DGC-3046',
    },
    {
      id: 3047,
      process_number_standard: 'ocds-lcuori-504120DGC-3047',
    },
    {
      id: 3048,
      process_number_standard: 'ocds-lcuori-504120DGC-3048',
    },
    {
      id: 3051,
      process_number_standard: 'ocds-lcuori-504120DGC-3051',
    },
    {
      id: 3052,
      process_number_standard: 'ocds-lcuori-504120DGC-3052',
    },
    {
      id: 3053,
      process_number_standard: 'ocds-lcuori-504120DGC-3053',
    },
    {
      id: 3054,
      process_number_standard: 'ocds-lcuori-504120DGC-3054',
    },
    {
      id: 3055,
      process_number_standard: 'ocds-lcuori-504120DGC-3055',
    },
    {
      id: 3056,
      process_number_standard: 'ocds-lcuori-504120DGC-3056',
    },
    {
      id: 3068,
      process_number_standard: 'ocds-lcuori-504120DGC-3068',
    },
    {
      id: 3120,
      process_number_standard: 'ocds-lcuori-504120DGC-3120',
    },
    {
      id: 3121,
      process_number_standard: 'ocds-lcuori-504120DGC-3121',
    },
    {
      id: 3122,
      process_number_standard: 'ocds-lcuori-504120DGC-3122',
    },
    {
      id: 3123,
      process_number_standard: 'ocds-lcuori-504120DGC-3123',
    },
    {
      id: 3124,
      process_number_standard: 'ocds-lcuori-504120DGC-3124',
    },
    {
      id: 3125,
      process_number_standard: 'ocds-lcuori-504120DGC-3125',
    },
    {
      id: 3126,
      process_number_standard: 'ocds-lcuori-504120DGC-3126',
    },
    {
      id: 3127,
      process_number_standard: 'ocds-lcuori-504120DGC-3127',
    },
    {
      id: 3128,
      process_number_standard: 'ocds-lcuori-504120DGC-3128',
    },
    {
      id: 3026,
      process_number_standard: 'ocds-lcuori-504120DGC-3026',
    },
    {
      id: 3129,
      process_number_standard: 'ocds-lcuori-504120DGC-3129',
    },
    {
      id: 3130,
      process_number_standard: 'ocds-lcuori-504120DGC-3130',
    },
    {
      id: 3131,
      process_number_standard: 'ocds-lcuori-504120DGC-3131',
    },
    {
      id: 3132,
      process_number_standard: 'ocds-lcuori-504120DGC-3132',
    },
    {
      id: 3133,
      process_number_standard: 'ocds-lcuori-504120DGC-3133',
    },
    {
      id: 3134,
      process_number_standard: 'ocds-lcuori-504120DGC-3134',
    },
    {
      id: 3135,
      process_number_standard: 'ocds-lcuori-504120DGC-3135',
    },
    {
      id: 3136,
      process_number_standard: 'ocds-lcuori-504120DGC-3136',
    },
    {
      id: 3137,
      process_number_standard: 'ocds-lcuori-504120DGC-3137',
    },
    {
      id: 3138,
      process_number_standard: 'ocds-lcuori-504120DGC-3138',
    },
    {
      id: 3139,
      process_number_standard: 'ocds-lcuori-504120DGC-3139',
    },
    {
      id: 3140,
      process_number_standard: 'ocds-lcuori-504120DGC-3140',
    },
    {
      id: 3141,
      process_number_standard: 'ocds-lcuori-504120DGC-3141',
    },
    {
      id: 3143,
      process_number_standard: 'ocds-lcuori-504120DGC-3143',
    },
    {
      id: 3145,
      process_number_standard: 'ocds-lcuori-504120DGC-3145',
    },
    {
      id: 3146,
      process_number_standard: 'ocds-lcuori-504120DGC-3146',
    },
    {
      id: 3174,
      process_number_standard: 'ocds-lcuori-504120DGC-3174',
    },
    {
      id: 3152,
      process_number_standard: 'ocds-lcuori-504120DGC-3152',
    },
    {
      id: 3153,
      process_number_standard: 'ocds-lcuori-504120DGC-3153',
    },
    {
      id: 3154,
      process_number_standard: 'ocds-lcuori-504120DGC-3154',
    },
    {
      id: 3155,
      process_number_standard: 'ocds-lcuori-504120DGC-3155',
    },
    {
      id: 3156,
      process_number_standard: 'ocds-lcuori-504120DGC-3156',
    },
    {
      id: 3158,
      process_number_standard: 'ocds-lcuori-504120DGC-3158',
    },
    {
      id: 3159,
      process_number_standard: 'ocds-lcuori-504120DGC-3159',
    },
    {
      id: 3160,
      process_number_standard: 'ocds-lcuori-504120DGC-3160',
    },
    {
      id: 3161,
      process_number_standard: 'ocds-lcuori-504120DGC-3161',
    },
    {
      id: 3162,
      process_number_standard: 'ocds-lcuori-504120DGC-3162',
    },
    {
      id: 3163,
      process_number_standard: 'ocds-lcuori-504120DGC-3163',
    },
    {
      id: 3144,
      process_number_standard: 'ocds-lcuori-504120DGC-3144',
    },
    {
      id: 3164,
      process_number_standard: 'ocds-lcuori-504120DGC-3164',
    },
    {
      id: 3165,
      process_number_standard: 'ocds-lcuori-504120DGC-3165',
    },
    {
      id: 3166,
      process_number_standard: 'ocds-lcuori-504120DGC-3166',
    },
    {
      id: 3167,
      process_number_standard: 'ocds-lcuori-504120DGC-3167',
    },
    {
      id: 3168,
      process_number_standard: 'ocds-lcuori-504120DGC-3168',
    },
    {
      id: 3169,
      process_number_standard: 'ocds-lcuori-504120DGC-3169',
    },
    {
      id: 3147,
      process_number_standard: 'ocds-lcuori-504120DGC-3147',
    },
    {
      id: 3148,
      process_number_standard: 'ocds-lcuori-504120DGC-3148',
    },
    {
      id: 3175,
      process_number_standard: 'ocds-lcuori-504120DGC-3175',
    },
    {
      id: 3170,
      process_number_standard: 'ocds-lcuori-504120DGC-3170',
    },
    {
      id: 3171,
      process_number_standard: 'ocds-lcuori-504120DGC-3171',
    },
    {
      id: 3172,
      process_number_standard: 'ocds-lcuori-504120DGC-3172',
    },
    {
      id: 3149,
      process_number_standard: 'ocds-lcuori-504120DGC-3149',
    },
    {
      id: 3173,
      process_number_standard: 'ocds-lcuori-504120DGC-3173',
    },
    {
      id: 3150,
      process_number_standard: 'ocds-lcuori-504120DGC-3150',
    },
    {
      id: 3151,
      process_number_standard: 'ocds-lcuori-504120DGC-3151',
    },
    {
      id: 3157,
      process_number_standard: 'ocds-lcuori-504120DGC-3157',
    },
    {
      id: 3176,
      process_number_standard: 'ocds-lcuori-504120DGC-3176',
    },
    {
      id: 3177,
      process_number_standard: 'ocds-lcuori-504120DGC-3177',
    },
    {
      id: 3178,
      process_number_standard: 'ocds-lcuori-504120DGC-3178',
    },
    {
      id: 3179,
      process_number_standard: 'ocds-lcuori-504120DGC-3179',
    },
    {
      id: 3180,
      process_number_standard: 'ocds-lcuori-504120DGC-3180',
    },
    {
      id: 3181,
      process_number_standard: 'ocds-lcuori-504120DGC-3181',
    },
    {
      id: 3182,
      process_number_standard: 'ocds-lcuori-504120DGC-3182',
    },
    {
      id: 3183,
      process_number_standard: 'ocds-lcuori-504120DGC-3183',
    },
    {
      id: 3184,
      process_number_standard: 'ocds-lcuori-504120DGC-3184',
    },
    {
      id: 3185,
      process_number_standard: 'ocds-lcuori-504120DGC-3185',
    },
    {
      id: 3186,
      process_number_standard: 'ocds-lcuori-504120DGC-3186',
    },
    {
      id: 3187,
      process_number_standard: 'ocds-lcuori-504120DGC-3187',
    },
    {
      id: 3188,
      process_number_standard: 'ocds-lcuori-504120DGC-3188',
    },
    {
      id: 3189,
      process_number_standard: 'ocds-lcuori-504120DGC-3189',
    },
    {
      id: 3190,
      process_number_standard: 'ocds-lcuori-504120DGC-3190',
    },
    {
      id: 3191,
      process_number_standard: 'ocds-lcuori-504120DGC-3191',
    },
    {
      id: 3192,
      process_number_standard: 'ocds-lcuori-504120DGC-3192',
    },
    {
      id: 3193,
      process_number_standard: 'ocds-lcuori-504120DGC-3193',
    },
    {
      id: 3194,
      process_number_standard: 'ocds-lcuori-504120DGC-3194',
    },
    {
      id: 3195,
      process_number_standard: 'ocds-lcuori-504120DGC-3195',
    },
    {
      id: 3196,
      process_number_standard: 'ocds-lcuori-504120DGC-3196',
    },
    {
      id: 3197,
      process_number_standard: 'ocds-lcuori-504120DGC-3197',
    },
    {
      id: 3198,
      process_number_standard: 'ocds-lcuori-504120DGC-3198',
    },
    {
      id: 3199,
      process_number_standard: 'ocds-lcuori-504120DGC-3199',
    },
    {
      id: 3200,
      process_number_standard: 'ocds-lcuori-504120DGC-3200',
    },
    {
      id: 3201,
      process_number_standard: 'ocds-lcuori-504120DGC-3201',
    },
    {
      id: 3202,
      process_number_standard: 'ocds-lcuori-504120DGC-3202',
    },
    {
      id: 3203,
      process_number_standard: 'ocds-lcuori-504120DGC-3203',
    },
    {
      id: 3204,
      process_number_standard: 'ocds-lcuori-504120DGC-3204',
    },
    {
      id: 3205,
      process_number_standard: 'ocds-lcuori-504120DGC-3205',
    },
    {
      id: 3206,
      process_number_standard: 'ocds-lcuori-504120DGC-3206',
    },
    {
      id: 3207,
      process_number_standard: 'ocds-lcuori-504120DGC-3207',
    },
    {
      id: 3208,
      process_number_standard: 'ocds-lcuori-504120DGC-3208',
    },
    {
      id: 3209,
      process_number_standard: 'ocds-lcuori-504120DGC-3209',
    },
    {
      id: 3210,
      process_number_standard: 'ocds-lcuori-504120DGC-3210',
    },
    {
      id: 3211,
      process_number_standard: 'ocds-lcuori-504120DGC-3211',
    },
    {
      id: 3212,
      process_number_standard: 'ocds-lcuori-504120DGC-3212',
    },
    {
      id: 3213,
      process_number_standard: 'ocds-lcuori-504120DGC-3213',
    },
    {
      id: 3214,
      process_number_standard: 'ocds-lcuori-504120DGC-3214',
    },
    {
      id: 3025,
      process_number_standard: 'ocds-lcuori-504120DGC-3025',
    },
    {
      id: 3215,
      process_number_standard: 'ocds-lcuori-504120DGC-3215',
    },
    {
      id: 3216,
      process_number_standard: 'ocds-lcuori-504120DGC-3216',
    },
    {
      id: 3217,
      process_number_standard: 'ocds-lcuori-504120DGC-3217',
    },
    {
      id: 3218,
      process_number_standard: 'ocds-lcuori-504120DGC-3218',
    },
    {
      id: 3219,
      process_number_standard: 'ocds-lcuori-504120DGC-3219',
    },
    {
      id: 3220,
      process_number_standard: 'ocds-lcuori-504120DGC-3220',
    },
    {
      id: 3221,
      process_number_standard: 'ocds-lcuori-504120DGC-3221',
    },
    {
      id: 3222,
      process_number_standard: 'ocds-lcuori-504120DGC-3222',
    },
    {
      id: 3223,
      process_number_standard: 'ocds-lcuori-504120DGC-3223',
    },
    {
      id: 3224,
      process_number_standard: 'ocds-lcuori-504120DGC-3224',
    },
    {
      id: 3225,
      process_number_standard: 'ocds-lcuori-504120DGC-3225',
    },
    {
      id: 3226,
      process_number_standard: 'ocds-lcuori-504120DGC-3226',
    },
    {
      id: 3240,
      process_number_standard: 'ocds-lcuori-504120DGC-3240',
    },
    {
      id: 3227,
      process_number_standard: 'ocds-lcuori-504120DGC-3227',
    },
    {
      id: 3228,
      process_number_standard: 'ocds-lcuori-504120DGC-3228',
    },
    {
      id: 3229,
      process_number_standard: 'ocds-lcuori-504120DGC-3229',
    },
    {
      id: 3230,
      process_number_standard: 'ocds-lcuori-504120DGC-3230',
    },
    {
      id: 3231,
      process_number_standard: 'ocds-lcuori-504120DGC-3231',
    },
    {
      id: 3232,
      process_number_standard: 'ocds-lcuori-504120DGC-3232',
    },
    {
      id: 3233,
      process_number_standard: 'ocds-lcuori-504120DGC-3233',
    },
    {
      id: 3234,
      process_number_standard: 'ocds-lcuori-504120DGC-3234',
    },
    {
      id: 3235,
      process_number_standard: 'ocds-lcuori-504120DGC-3235',
    },
    {
      id: 3236,
      process_number_standard: 'ocds-lcuori-504120DGC-3236',
    },
    {
      id: 3237,
      process_number_standard: 'ocds-lcuori-504120DGC-3237',
    },
    {
      id: 3238,
      process_number_standard: 'ocds-lcuori-504120DGC-3238',
    },
    {
      id: 3239,
      process_number_standard: 'ocds-lcuori-504120DGC-3239',
    },
    {
      id: 3241,
      process_number_standard: 'ocds-lcuori-504120DGC-3241',
    },
    {
      id: 3242,
      process_number_standard: 'ocds-lcuori-504120DGC-3242',
    },
    {
      id: 3030,
      process_number_standard: 'ocds-lcuori-504120DGC-3030',
    },
    {
      id: 3031,
      process_number_standard: 'ocds-lcuori-504120DGC-3031',
    },
    {
      id: 3243,
      process_number_standard: 'ocds-lcuori-504120DGC-3243',
    },
    {
      id: 3244,
      process_number_standard: 'ocds-lcuori-504120DGC-3244',
    },
    {
      id: 3245,
      process_number_standard: 'ocds-lcuori-504120DGC-3245',
    },
    {
      id: 3246,
      process_number_standard: 'ocds-lcuori-504120DGC-3246',
    },
    {
      id: 3247,
      process_number_standard: 'ocds-lcuori-504120DGC-3247',
    },
    {
      id: 3248,
      process_number_standard: 'ocds-lcuori-504120DGC-3248',
    },
    {
      id: 3249,
      process_number_standard: 'ocds-lcuori-504120DGC-3249',
    },
    {
      id: 3250,
      process_number_standard: 'ocds-lcuori-504120DGC-3250',
    },
    {
      id: 3251,
      process_number_standard: 'ocds-lcuori-504120DGC-3251',
    },
    {
      id: 2643,
      process_number_standard: 'ocds-lcuori-504120DGC-2643',
    },
    {
      id: 2644,
      process_number_standard: 'ocds-lcuori-504120DGC-2644',
    },
    {
      id: 2647,
      process_number_standard: 'ocds-lcuori-504120DGC-2647',
    },
    {
      id: 2648,
      process_number_standard: 'ocds-lcuori-504120DGC-2648',
    },
    {
      id: 3639,
      process_number_standard: 'ocds-lcuori-504120DGC-3639',
    },
    {
      id: 3640,
      process_number_standard: 'ocds-lcuori-504120DGC-3640',
    },
    {
      id: 3641,
      process_number_standard: 'ocds-lcuori-504120DGC-3641',
    },
    {
      id: 2570,
      process_number_standard: 'ocds-lcuori-504120000-2570',
    },
    {
      id: 2576,
      process_number_standard: 'ocds-lcuori-504120DGC-2576',
    },
    {
      id: 2571,
      process_number_standard: 'ocds-lcuori-504120DGC-2571',
    },
    {
      id: 2573,
      process_number_standard: 'ocds-lcuori-504120DGC-2573',
    },
    {
      id: 2574,
      process_number_standard: 'ocds-lcuori-504120DGC-2574',
    },
    {
      id: 2572,
      process_number_standard: 'ocds-lcuori-504120DGC-2572',
    },
    {
      id: 2575,
      process_number_standard: 'ocds-lcuori-504120DGC-2575',
    },
    {
      id: 3731,
      process_number_standard: 'oc4ids-504-120-0003731',
    },
    {
      id: 3732,
      process_number_standard: 'oc4ids-504-120-0003732',
    },
    {
      id: 3743,
      process_number_standard: 'oc4ids-504-120-0003743',
    },
    {
      id: 3744,
      process_number_standard: 'oc4ids-504-120-0003744',
    },
    {
      id: 3745,
      process_number_standard: 'oc4ids-504-120-0003745',
    },
    {
      id: 3746,
      process_number_standard: 'oc4ids-504-120-0003746',
    },
    {
      id: 3747,
      process_number_standard: 'oc4ids-504-120-0003747',
    },
    {
      id: 3748,
      process_number_standard: 'oc4ids-504-120-0003748',
    },
    {
      id: 3749,
      process_number_standard: 'oc4ids-504-120-0003749',
    },
    {
      id: 3750,
      process_number_standard: 'oc4ids-504-120-0003750',
    },
    {
      id: 3751,
      process_number_standard: 'oc4ids-504-120-0003751',
    },
    {
      id: 3752,
      process_number_standard: 'oc4ids-504-120-0003752',
    },
    {
      id: 3788,
      process_number_standard: 'oc4ids-504-120-0003788',
    },
    {
      id: 3798,
      process_number_standard: 'oc4ids-504-120-0003798',
    },
    {
      id: 3719,
      process_number_standard: 'oc4ids-504--0003719',
    },
    {
      id: 3729,
      process_number_standard: 'oc4ids-504-801-0003729',
    },
    {
      id: 3675,
      process_number_standard: '-3675',
    },
    {
      id: 3733,
      process_number_standard: 'oc4ids-504-120-0003733',
    },
    {
      id: 3789,
      process_number_standard: 'oc4ids-504-120-0003789',
    },
    {
      id: 3790,
      process_number_standard: 'oc4ids-504-120-0003790',
    },
    {
      id: 3791,
      process_number_standard: 'oc4ids-504-120-0003791',
    },
    {
      id: 3792,
      process_number_standard: 'oc4ids-504-120-0003792',
    },
    {
      id: 3734,
      process_number_standard: 'oc4ids-504-120-0003734',
    },
    {
      id: 3753,
      process_number_standard: 'oc4ids-504-120-0003753',
    },
    {
      id: 3735,
      process_number_standard: 'oc4ids-504-120-0003735',
    },
    {
      id: 3736,
      process_number_standard: 'oc4ids-504-120-0003736',
    },
    {
      id: 3754,
      process_number_standard: 'oc4ids-504-120-0003754',
    },
    {
      id: 3755,
      process_number_standard: 'oc4ids-504-120-0003755',
    },
    {
      id: 3737,
      process_number_standard: 'oc4ids-504-120-0003737',
    },
    {
      id: 3738,
      process_number_standard: 'oc4ids-504-120-0003738',
    },
    {
      id: 3756,
      process_number_standard: 'oc4ids-504-120-0003756',
    },
    {
      id: 3740,
      process_number_standard: 'oc4ids-504-120-0003740',
    },
    {
      id: 3757,
      process_number_standard: 'oc4ids-504-120-0003757',
    },
    {
      id: 3741,
      process_number_standard: 'oc4ids-504-120-0003741',
    },
    {
      id: 3758,
      process_number_standard: 'oc4ids-504-120-0003758',
    },
    {
      id: 3742,
      process_number_standard: 'oc4ids-504-120-0003742',
    },
    {
      id: 3759,
      process_number_standard: 'oc4ids-504-120-0003759',
    },
    {
      id: 3760,
      process_number_standard: 'oc4ids-504-120-0003760',
    },
    {
      id: 3761,
      process_number_standard: 'oc4ids-504-120-0003761',
    },
    {
      id: 3762,
      process_number_standard: 'oc4ids-504-120-0003762',
    },
    {
      id: 3763,
      process_number_standard: 'oc4ids-504-120-0003763',
    },
    {
      id: 3764,
      process_number_standard: 'oc4ids-504-120-0003764',
    },
    {
      id: 3765,
      process_number_standard: 'oc4ids-504-120-0003765',
    },
    {
      id: 3766,
      process_number_standard: 'oc4ids-504-120-0003766',
    },
    {
      id: 3767,
      process_number_standard: 'oc4ids-504-120-0003767',
    },
    {
      id: 3768,
      process_number_standard: 'oc4ids-504-120-0003768',
    },
    {
      id: 3769,
      process_number_standard: 'oc4ids-504-120-0003769',
    },
    {
      id: 3770,
      process_number_standard: 'oc4ids-504-120-0003770',
    },
    {
      id: 3771,
      process_number_standard: 'oc4ids-504-120-0003771',
    },
    {
      id: 3772,
      process_number_standard: 'oc4ids-504-120-0003772',
    },
    {
      id: 3773,
      process_number_standard: 'oc4ids-504-120-0003773',
    },
    {
      id: 3774,
      process_number_standard: 'oc4ids-504-120-0003774',
    },
    {
      id: 3775,
      process_number_standard: 'oc4ids-504-120-0003775',
    },
    {
      id: 3776,
      process_number_standard: 'oc4ids-504-120-0003776',
    },
    {
      id: 3777,
      process_number_standard: 'oc4ids-504-120-0003777',
    },
    {
      id: 3778,
      process_number_standard: 'oc4ids-504-120-0003778',
    },
    {
      id: 3779,
      process_number_standard: 'oc4ids-504-120-0003779',
    },
    {
      id: 3780,
      process_number_standard: 'oc4ids-504-120-0003780',
    },
    {
      id: 3781,
      process_number_standard: 'oc4ids-504-120-0003781',
    },
    {
      id: 3782,
      process_number_standard: 'oc4ids-504-120-0003782',
    },
    {
      id: 3783,
      process_number_standard: 'oc4ids-504-120-0003783',
    },
    {
      id: 3784,
      process_number_standard: 'oc4ids-504-120-0003784',
    },
    {
      id: 3786,
      process_number_standard: 'oc4ids-504-120-0003786',
    },
    {
      id: 3787,
      process_number_standard: 'oc4ids-504-120-0003787',
    },
    {
      id: 3794,
      process_number_standard: 'oc4ids-504-120-0003794',
    },
    {
      id: 3795,
      process_number_standard: 'oc4ids-504-120-0003795',
    },
    {
      id: 3796,
      process_number_standard: 'oc4ids-504-120-0003796',
    },
    {
      id: 3797,
      process_number_standard: 'oc4ids-504-120-0003797',
    },
    {
      id: 3674,
      process_number_standard: '-3674',
    },
    {
      id: 3671,
      process_number_standard: 'CO002-3671',
    },
    {
      id: 3673,
      process_number_standard: '-3673',
    },
    {
      id: 3665,
      process_number_standard: 'ocds-lcuori-504120000-3665',
    },
    {
      id: 3694,
      process_number_standard: 'oc4ids-504-120-0003694',
    },
    {
      id: 3793,
      process_number_standard: 'oc4ids-504-120-0003793',
    },
    {
      id: 3672,
      process_number_standard: '000S3-3672',
    },
    {
      id: 3695,
      process_number_standard: 'oc4ids-504-120-0003695',
    },
    {
      id: 3697,
      process_number_standard: 'oc4ids-504-120-0003697',
    },
    {
      id: 3698,
      process_number_standard: 'oc4ids-504-120-0003698',
    },
    {
      id: 3699,
      process_number_standard: 'oc4ids-504-120-0003699',
    },
    {
      id: 3696,
      process_number_standard: 'oc4ids-504-120-0003696',
    },
    {
      id: 3700,
      process_number_standard: 'oc4ids-504-120-0003700',
    },
    {
      id: 3702,
      process_number_standard: 'oc4ids-504-120-0003702',
    },
    {
      id: 3703,
      process_number_standard: 'oc4ids-504-120-0003703',
    },
    {
      id: 3704,
      process_number_standard: 'oc4ids-504-120-0003704',
    },
    {
      id: 3705,
      process_number_standard: 'oc4ids-504-120-0003705',
    },
    {
      id: 3707,
      process_number_standard: 'oc4ids-504-120-0003707',
    },
    {
      id: 3710,
      process_number_standard: 'oc4ids-504-120-0003710',
    },
    {
      id: 3712,
      process_number_standard: 'oc4ids-504-120-0003712',
    },
    {
      id: 3711,
      process_number_standard: 'oc4ids-504-120-0003711',
    },
    {
      id: 3714,
      process_number_standard: 'oc4ids-504-120-0003714',
    },
    {
      id: 3716,
      process_number_standard: 'oc4ids-504-120-0003716',
    },
    {
      id: 3717,
      process_number_standard: 'oc4ids-504-120-0003717',
    },
    {
      id: 3720,
      process_number_standard: 'oc4ids-504-120-0003720',
    },
    {
      id: 3718,
      process_number_standard: 'oc4ids-504-120-0003718',
    },
    {
      id: 3721,
      process_number_standard: 'oc4ids-504-120-0003721',
    },
    {
      id: 3722,
      process_number_standard: 'oc4ids-504-120-0003722',
    },
    {
      id: 3725,
      process_number_standard: 'oc4ids-504-120-0003725',
    },
    {
      id: 3723,
      process_number_standard: 'oc4ids-504-120-0003723',
    },
    {
      id: 3726,
      process_number_standard: 'oc4ids-504-120-0003726',
    },
    {
      id: 3728,
      process_number_standard: 'oc4ids-504-120-0003728',
    },
    {
      id: 3724,
      process_number_standard: 'oc4ids-504-120-0003724',
    },
    {
      id: 3730,
      process_number_standard: 'oc4ids-504-120-0003730',
    },
    {
      id: 3644,
      process_number_standard: 'ocds-lcuori-504120enp-3644',
    },
    {
      id: 3645,
      process_number_standard: 'ocds-lcuori-504120enp-3645',
    },
    {
      id: 3646,
      process_number_standard: 'ocds-lcuori-504120DGC-3646',
    },
    {
      id: 3647,
      process_number_standard: 'ocds-lcuori-504120DGC-3647',
    },
    {
      id: 3648,
      process_number_standard: 'ocds-lcuori-504120DGC-3648',
    },
    {
      id: 3649,
      process_number_standard: 'ocds-lcuori-504120DGC-3649',
    },
    {
      id: 3650,
      process_number_standard: 'ocds-lcuori-504120DGC-3650',
    },
    {
      id: 3651,
      process_number_standard: 'ocds-lcuori-504120DGC-3651',
    },
    {
      id: 3652,
      process_number_standard: 'ocds-lcuori-504120DGC-3652',
    },
    {
      id: 3653,
      process_number_standard: 'ocds-lcuori-504120DGC-3653',
    },
    {
      id: 3654,
      process_number_standard: 'ocds-lcuori-504120DGC-3654',
    },
    {
      id: 3655,
      process_number_standard: 'ocds-lcuori-504120DGC-3655',
    },
    {
      id: 3661,
      process_number_standard: 'ocds-lcuori-504120enp-3661',
    },
    {
      id: 3662,
      process_number_standard: 'ocds-lcuori-504120enp-3662',
    },
    {
      id: 3663,
      process_number_standard: 'ocds-lcuori-504120enp-3663',
    },
    {
      id: 3664,
      process_number_standard: 'ocds-lcuori-504120enp-3664',
    },
  ];

  sections = [
    {
      id: 1,
      title: 'Preparation',
    },
    {
      id: 1,
      title: 'To Tend',
    },
    {
      id: 1,
      title: 'Contract',
    },
    {
      id: 1,
      title: 'Implementation',
    },
    {
      id: 1,
      title: 'Advances',
    },
  ];

  documentTypes = [
    {
      id: 1,
      title: 'Multi Year Budget Program',
    },
    {
      id: 1,
      title: 'Environmental Impact license',
    },
    {
      id: 1,
      title: 'Resettlement compensation Plan',
    },
  ];

  filteredSections: any;
  filteredProjects: any;
  filteredDocumentTypes: any;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.setUpDocumentForm();
  }

  setUpDocumentForm(): void {
    this.documentForm = this.fb.group({
      section_id: ['', []], // Validators.required
      document_type_id: ['', []], // Validators.required
      project_id: ['', []], // Validators.required
      document_file: ['', []], // Validators.required
      author: ['', []], // Validators.required
      qualification: ['', []], // Validators.required
      description: ['', []], // Validators.required
      publication_date: ['', []], // Validators.required
      home_page: ['', []], // Validators.required
      final_page: ['', []], // Validators.required
    });

    this.filteredSections = this.documentForm
      .get('section_id)')
      ?.valueChanges.pipe(
        startWith(null),
        map((state) =>
          state ? this._filterSections(state) : this.sections.slice()
        )
      );

    this.filteredDocumentTypes = this.documentForm
      .get('document_type_id')
      ?.valueChanges.pipe(
        startWith(null),
        map((state) =>
          state ? this._filterDocumentTypes(state) : this.documentTypes.slice()
        )
      );

    this.filteredProjects = this.documentForm
      .get('project_id')
      ?.valueChanges.pipe(
        startWith(null),
        map((state) => (state ? this._filter(state) : this.projects.slice()))
      );
  }

  saveDocument(formValue: FormGroup) {
    console.log('Form Value ', formValue.value);
  }
  displayStateProjects(state: any) {
    return state ? state.process_number_standard : '';
  }

  displayStateSections(state: any) {
    return state ? state.title : '';
  }

  displayStateDocumentTypes(state: any) {
    return state ? state.title : '';
  }

  private _filter(value: any): any[] {
    let process_number = value.process_number_standard || value;

    return this.projects.filter((option) =>
      option.process_number_standard != null
        ? option.process_number_standard
            .toLowerCase()
            .indexOf(process_number.toLowerCase()) === 0
        : null
    );
  }

  private _filterSections(value: any): any[] {
    let title = value.title || value;

    return this.sections.filter((option) =>
      option.title != null
        ? option.title
            .toLowerCase()
            .indexOf(title.toLowerCase()) === 0
        : null
    );
  }

  private _filterDocumentTypes(value: any): any[] {
    let title = value.title || value;

    return this.documentTypes.filter((option) =>
      option.title != null
        ? option.title.toLowerCase().indexOf(title.toLowerCase()) === 0
        : null
    );
  }
}
