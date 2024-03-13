from flask import request, jsonify, send_file, render_template, redirect, flash
from config import app
from jobspy import scrape_jobs
import pandas as pd
import time




@app.route('/scrapejobs', methods=['GET'])
def scrape_jobs_route_csv():
    try:
        site_name = request.args.get('sitename')
        search_term = request.args.get('search_term')
        location = request.args.get('location')
        country_indeed = request.args.get('country')

        if not site_name or not search_term or not location or not country_indeed:
            flash("All fields are required.")
            return redirect('/job_hunt')

        if site_name.lower() == 'glassdoor' and country_indeed.lower() == 'nigeria':
            flash("The site Glassdoor does not work for countries in Nigeria")
            return redirect('/job_hunt')

        jobs = scrape_jobs(
            site_name=site_name,
            search_term=search_term,
            location=location,
            results_wanted=51,
            country_indeed=country_indeed
        )

        print(f"Found {len(jobs)} jobs")
        print(jobs.head())

        file = request.args.get('file')
        if file == "Excel":
            jobs.to_excel("jobs.xlsx", index=False)
            return send_file('jobs.xlsx', as_attachment=True)
        else:
            jobs.to_csv("jobs.csv", index=False)
            return send_file('jobs.csv', as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500









@app.route("/")
def index():
    return render_template("index.html")
@app.route("/job_hunt")
def job_hunt():
    return render_template("search.html")
@app.route("/contact_us")
def contact():
    return render_template('contact.html')






if __name__ == '__main__':
    # This is used when running locally only. The Flask development server is not used in production.
    app.run(port=3000, debug=True)

