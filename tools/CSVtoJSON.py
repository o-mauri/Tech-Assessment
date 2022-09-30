import csv
import json

def convert_csv(fpath):
    f = open(fpath, encoding='utf-8-sig')
    reader = csv.reader(f)

    header = next(reader)

    data = []
    for row in reader:
        person = {
            header[0] : row[0],
            header[1] : row[1],
            header[2] : row[2],
            header[3] : row[3],
            header[4] : row[4]
        }

        data.append(person)
    
    obj = { "Employees" : data}

    j_file = open('tools/InterviewTestData.json', 'w+')
    
    json.dump(obj, j_file)

convert_csv('tools/InterviewTestData.csv')
    
