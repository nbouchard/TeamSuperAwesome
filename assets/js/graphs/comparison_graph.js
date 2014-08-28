var comparisonGraph = c3.generate({
    bindto: '#comparisonGraph',
    color: { pattern: ['#e421f9', '#23b0f7' ] },
    data: {
        names: {
            data1: 'Email 1',
            data2: 'Email 2'
        },
        columns: [
            ['data1', 5, 7, 2, 3, 2, 0],
            ['data2', 8, 5, 7, 3, 1, 2]
        ],
        types: {
            data1: 'area-spline',
            data2: 'area-spline'
        }
    },
    axis: {
        x: {
            label: {
                text: 'per Day',
                position: 'outer-center'
            }
        },
        y: {
            label: {
                text: 'Opens',
                position: 'outer-middle'
            }
        }
    },
    tooltip: {
        grouped: false
    }
});
