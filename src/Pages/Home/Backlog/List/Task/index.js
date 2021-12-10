import { Component } from 'react';
import { connect } from 'react-redux';
import { editTaskPoints } from 'Actions/Backlog';
import TaskIcon from 'Icons/task.png';
import Bug from 'Icons/bug.png';
import Story from 'Icons/story.png';
import PHigh from 'Icons/pHigh.png';
import PMed from 'Icons/pMed.png';
import PLow from 'Icons/pLow.png';
import './_Task.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    this.blur = this.blur.bind(this);
    this.updatePoints = this.updatePoints.bind(this);
  }

  static defaultProps = {
    id: '',
    type: '',
    summary: '',
    priority: 'LOW',
    assignee: '',
    points: 0,
  }

  shouldComponentUpdate({ id, points }) {
    console.log(points);
    const curProps = this.props;
    if (id !== curProps.id) return true;
    else if (points !== curProps.points) return true;
    return false;
  }

  enumType(type) {
    switch (type) {
      case 'STORY':
        return <img src={Story} alt='story' />
      case 'BUG':
        return <img src={Bug} alt='bug' />
      case 'TASK':
      default:
        return <img src={TaskIcon} alt='task' />
    }
  }

  enumPriority(priority) {
    switch (priority) {
      case 'HIGH':
        return <img src={PHigh} alt='high' />
      case 'MEDIUM':
        return <img src={PMed} alt='medium' />
      case 'LOW':
      default:
        return <img src={PLow} alt='low' />
    }
  }

  updatePoints(e) {
    const { editTaskPoints, index } = this.props;
    editTaskPoints(index, parseInt(e.target.value));
  }

  blur(e) {
    const { value } = e.target;
    if (value === '') {
      const { editTaskPoints, index } = this.props;
      editTaskPoints(index, 0);
    }
  }

  render() {
    const { id, type, summary, priority, assignee, points } = this.props;
    return (
      <tr className='backlog-item'>
        <td className='type'>{this.enumType(type)}</td>
        <td>{id}</td>
        <td className='priority'>{this.enumPriority(priority)}</td>
        <td>{summary}</td>
        <td className='assignee'>{assignee}</td>
        <td className='points'>
          <input
            type='number'
            value={points}
            onBlur={this.blur}
            onChange={this.updatePoints} />
        </td>
      </tr>
    )
  }
}

export default connect(null, { editTaskPoints })(Task);