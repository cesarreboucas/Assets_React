import React from 'react';
import GoalItemForm from './goalItemForm';

class GoalsDetail extends React.Component {

    render() {
        return(
            <div>
                <h1>Create</h1>
                <GoalItemForm />
            </div>
        );
    }
}

export default GoalsDetail;