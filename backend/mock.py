import os
import csv


def load_data():
    patients = {}

    datadir = os.path.join(os.path.dirname(__file__), 'data')
    for i, fn in sorted(enumerate(os.listdir(datadir))):
        i += 1

        fn = os.path.join(datadir, fn)

        pat_id = str(i)

        with open(fn) as f:
            r = csv.reader(f)
            next(r)

            records = list(r)
            x = records[len(records)-i]
            date = x[0]

            patients[pat_id] = {
                'id': pat_id,
                'name': 'Patient {}'.format(i),
                'birth_date': '1962-04-10',
                'gender': i % 2 == 0 and 'Male' or 'Female',
                'heart_rate': [{
                    'time': date,
                    'value': float(x[2]),
                    'unit': '',
                }],
                'respiratory_rate': [{
                    'time': date,
                    'value': float(x[3]),
                    'unit': '',
                }],
                'temperature': [{
                    'time': date,
                    'value': float(x[1]),
                    'unit': '',
                }],
                'pulse_ox': [{
                    'time': date,
                    'value': float(x[5]),
                    'unit': '',
                }],
                'systolic_bp': [{
                    'time': date,
                    'value': float(x[4]),
                    'unit': '',
                }],
                'mental_status': None,
                'eating_status': None,
            }

    return patients
