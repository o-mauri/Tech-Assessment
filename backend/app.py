import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data_file_path = './data/InterviewTestData.json'

@app.route("/")
def health_check():
    return "<p>If you can see this message, backend server is running correctly!</p>"

@app.route("/employeedata")
def get_employee_data():
    data_file = open(data_file_path, 'r')
    data_json = json.load(data_file)
    data_file.close()

    return data_json

@app.route("/justnames")
def get_just_names():
    data_file = open(data_file_path, 'r')
    data_json = json.load(data_file)
    emps = data_json["Employees"]
    
    names = []
    for person in emps:
        name = [person["FirstName"], person["LastName"]]
        names.append(name)
    
    data = {"Names" : names}

    return data

@app.route("/userbyname")
def get_user_by_name():
    args = request.args
    if "FirstName" not in args.keys() or "LastName" not in args.keys():
        return "MISSING USER NAME"
    else:
        name = [args["FirstName"].lower(), args["LastName"].lower()]
        data_file = open(data_file_path, 'r')
        data_json = json.load(data_file)
        data_file.close()
        emps = data_json["Employees"]

        for person in emps:
            if person["FirstName"].lower() == name[0] and person["LastName"].lower() == name[1]:
                return person
        
        return {}

@app.route("/checkconflicts", methods=['POST'])
def check_user_conflicts():
    data = request.json

    email = data['Email'].lower()
    phone = data['Phone'].lower()
    resp = {'conflicts' : False}
    data_file = open(data_file_path, 'r')
    data_json = json.load(data_file)
    data_file.close()
    for person in data_json["Employees"]:
        if person["Email"].lower() == email or person["Phone"].lower() == phone:
            resp = {"conflicts" : True}
    
    return resp


@app.route("/newuser", methods=['POST'])
def add_new_user():
    data = request.json
    data_file = open(data_file_path, 'r')
    data_json = json.load(data_file)
    data_file.close()
    data["FirstName"] = data["FirstName"].title()
    data["LastName"] = data["LastName"].title()
    data["JobTitle"] = data["JobTitle"].title()

    for key in data.keys():
        data[key] = data[key].strip()

    data_json["Employees"].append(data)

    data_file_write = open(data_file_path, 'w')
    json.dump(data_json, data_file_write)
    data_file_write.close()
    
    return {"NewUser" : True}