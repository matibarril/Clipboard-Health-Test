# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Note: AC stands for Acceptance Criteria.**
**Note: Time effort estimation are ballpark.**

### T1 - Create getWorkedHoursSummary method. 
- Description: We are going to create a method to retrieve summary of worked hours for each Agent at a given Facility within a given time period.
  This funtion will recieve as argument the FacilityId and startDate and endDate. It will find all shifts for a given quarter filtered by FacilityId group by Agent and sum all the worked hours.
- AC: 
  - The funtion should return a list of Agents and the Total worked hours. expected data facility_id, agent_id, external_id, start_date, end_date, total_worked_hours.
  - External_id may not be present since this feature is a nice to have. If we get to implement this feature we are going to include this field. 
- time/effort: 1 day.
  
### T1.1 - Create test for getWorkedHoursSummary . 
- Description: Create Unit test for this method.
- AC: 
  - Should have at least the happy path.
- time/effort: 1 day.
- 

### T2 - Create generateAgentsReport method. 
- Description: We need to create a method that generate reports summing up every Shift by Agent for a given Facility and quarter.
- AC: 
  - Create a PDF with the report of worked hours by Agent.
  - This PDF should list all the Agents from a given Facility and for each Agent it should show the amount for hours worked in a given quarter.
- time/effort: 1.5 day.

### T2.1 - Create test for generateAgentReport . 
- Description: Create Unit test for generateAgentReport
- AC: 
  - Should have at least the happy path.
- time/effort: 1 day.
    
### T3 - Create facilities_agents Table for support external Facility ids for Agents
- Description: We are going to add a new Table to support external Id for Agents that works in multiple Facilities. The table will have the following fields: facility_id, agent_id, external_id.
facility_id and agent_id are going to be a compose unique primary key to ensure that every agent can have only one external id per facility.
This is a tentative SQL for create a table

```
CREATE TABLE facilities_agents (
  facility_id INT NOT NULL,
  agent_id INT NOT NULL,
  external_id VARCHAR(50) NOT NULL,
  PRIMARY KEY (facility_id, agent_id),
  CONSTRAINT fk_facility
    FOREIGN KEY (facility_id)
    REFERENCES Facilities(id),
  CONSTRAINT fk_agent
    FOREIGN KEY (agent_id)
    REFERENCES Agents(id)
);
```
- AC:
  A new Table should be created to hold the relation between Facility and Agent.
- time/effort: 1 day.   