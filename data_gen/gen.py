import pandas as pd
import random as rd
import sys

days = 7
patients = 5

# temp less than 37.7
# SBP greater than 90
# RR less than 24
# O2 greater than 90
# HR less than 100

date_range = pd.date_range(start='10/01/17', end='10/07/17')

data = {'data': date_range, 'temp': round(rd.uniform(37.7, 40), 2), 'hr': round(rd.uniform(101, 119), 2),
        'sbp': round(rd.uniform(70, 90), 2), 'rr': round(rd.uniform(25, 30), 2), 'o2': round(rd.uniform(70, 90), 2)}

df = pd.DataFrame(data, columns=['temp', 'hr', 'sbp', 'rr', 'o2'], index=date_range)
days_to_clearance = rd.randint(3,7)

temp_norm = 37.7
hr_norm = 100
sbp_norm = 90
rr_norm = 24
o2_norm = 90

dx_temp = (df.ix[0]['temp'] - temp_norm)/days_to_clearance
change_temp = [dx_temp, dx_temp*2, dx_temp*3, dx_temp*4, dx_temp*5, dx_temp*6, dx_temp*7]
dx_hr = (df.ix[0]['hr'] - hr_norm)/days_to_clearance
change_hr = [dx_hr, dx_hr*2, dx_hr*3, dx_hr*4, dx_hr*5, dx_hr*6, dx_hr*7]
dx_sbp = (df.ix[0]['sbp'] - sbp_norm)/days_to_clearance
change_sbp = [dx_sbp, dx_sbp*2, dx_sbp*3, dx_sbp*4, dx_sbp*5, dx_sbp*6, dx_sbp*7]
dx_rr = (df.ix[0]['rr'] - rr_norm)/days_to_clearance
change_rr = [dx_rr, dx_rr*2, dx_rr*3, dx_rr*4, dx_rr*5, dx_rr*6, dx_rr*7]
dx_o2 = (df.ix[0]['o2'] - o2_norm)/days_to_clearance
change_o2 = [dx_o2, dx_o2*2, dx_o2*3, dx_o2*4, dx_o2*5, dx_o2*6, dx_o2*7]

change_data = {'data': date_range, 'temp': change_temp, 'hr':change_hr, 'sbp': change_sbp, 'rr': change_rr, 'o2': change_o2}

df_change = pd.DataFrame(change_data, columns=['temp', 'hr', 'sbp', 'rr', 'o2'], index=date_range)

out = pd.DataFrame.round(df - df_change, 2)
out.index.name = 'date'
try:
    out.to_csv(sys.argv[1])
    print(df)
except IndexError:
    print("Please include a patient name.")
    print("Proper Execution: python gen.py {patient_name}")
