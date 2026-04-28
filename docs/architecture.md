# Architecture

## Analytics Events

The following Firebase Analytics events are logged in the application:

- `task_selected`: Logged when a user selects a civic flow from a task card. Parameters:
  - `flow_id`: The ID of the selected flow.
- `flow_completed`: Logged when a user clicks a CTA button to navigate to an external official source at the end of a flow. Parameters:
  - `flow_id`: The ID of the completed flow.
  - `action`: The label of the CTA button clicked.
- `source_chip_clicked`: Logged when a user clicks a source chip to view the official source. Parameters:
  - `source_id`: The ID of the source.
- `out_of_scope_triggered`: Logged when the Gemini AI classifies a user query as out of scope. Parameters:
  - `query`: The original user query.
- `fallback_shown`: Logged when an error occurs during an AI interaction and a fallback UI is displayed. Parameters:
  - `type`: The type of error (e.g., 'classification_error').
