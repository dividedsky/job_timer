import React from 'react';
import Clock from './Clock';
import { MyButton, ResetButton } from './Button';
import DataForm from './DataForm';
import { Object } from 'core-js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getCompletedJob = props.getCompletedJob.bind(this);
    this.state = {
      totalTimer: 0,
      currentTimer: 0,
      amount: '',
      jobName: '',
      payPerHour: null,
      jobStartTime: null,
      startTime: null,
      running: false,
      clockInt: null,
    };
    // this.state = { ...props };
  }

  componentDidMount() {
    Object.keys(this.state).forEach(key => {
      if (localStorage.getItem(key)) {
        this.setState({ [key]: JSON.parse(localStorage.getItem(key)) });
      }
    });
    // if (localStorage.getItem('currentTimer')) {
    //   this.setState({
    //     currentTimer: JSON.parse(localStorage.getItem('currentTimer')),
    //   });
    // }
    // if (localStorage.getItem('totalTimer')) {
    //   this.setState({
    //     totalTimer: JSON.parse(localStorage.getItem('totalTimer')),
    //   });
    // }

    // if (localStorage.getItem('jobStartTime')) {
    //   this.setState({
    //     jobStartTime: JSON.parse(localStorage.getItem('jobStartTime')),
    //   });

    //   if (localStorage.getItem('jobName')) {
    //     this.setState({
    //       jobName: JSON.parse(localStorage.getItem('jobName')),
    //     });
    //   }
    // }

    // event listener to clear timer on refresh
    window.addEventListener('beforeunload', this.cleanup);
  }

  cleanup() {
    console.log('cleaning up');
    localStorage.setItem('currentTimer', 0);
  }

  componentDidUpdate() {
    localStorage.setItem(
      'currentTimer',
      JSON.stringify(this.state.currentTimer)
    );
    localStorage.setItem('totalTimer', JSON.stringify(this.state.totalTimer));
  }

  componentWillUnmount() {
    this.setState({ currentTimer: 0 });
    localStorage.setItem('currentTimer', JSON.stringify(0));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    localStorage.setItem(e.target.name, JSON.stringify(e.target.value));
  };

  resetClock = () => {
    if (this.state.running) {
      this.toggleClock();
    }
    this.setState({ totalTimer: 0, currentTimer: 0 });
  };

  completeJob = e => {
    e.preventDefault();
    if (this.state.jobName && this.state.amount) {
      const newJob = {
        id: Date.now(),
        name: this.state.jobName,
        time: this.formatTime(this.state.totalTimer),
        amount: this.state.amount,
        payPerHour: (
          (this.state.amount / this.state.totalTimer) *
          3600
        ).toFixed(2),
      };
      this.getCompletedJob(newJob);
      this.resetClock();
      this.setState({ jobName: '', amount: '' });
      localStorage.setItem('jobName', '');
      localStorage.setItem('amount', '');
    }
  };

  toggleClock = () => {
    if (!this.state.running) {
      if (this.state.jobStartTime === null) {
        this.setState({ jobStartTime: Date() });
        localStorage.setItem('jobStartTime', JSON.stringify(Date()));
      }

      this.setState({ startTime: Date() }); // ??

      const interval = setInterval(() => {
        this.setState(prevState => {
          return {
            currentTimer: prevState.currentTimer + 1,
            totalTimer: prevState.totalTimer + 1,
          };
        });
      }, 1000);
      this.setState({ clockInt: interval });
    } else {
      clearInterval(this.state.clockInt);
      this.setState({ currentTimer: 0 });
    }

    this.setState({ running: !this.state.running });
  };

  /* eslint class-methods-use-this: [1, { "exceptMethods": ["formatTime", "cleanup"] } ] */
  formatTime(sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - hours * 3600) / 60);
    const seconds = sec - hours * 3600 - minutes * 60;
    let result = '';
    if (hours) {
      result += `${hours}:`;
    }
    if (minutes) {
      if (hours && minutes < 10) {
        result += '0';
      }
      result += `${minutes}:`;
    } else {
      result += '00:';
    }

    if (seconds < 10) {
      result += '0';
    }
    result += seconds;
    return result;
  }

  render() {
    return (
      <div className="home">
        <MyButton running={this.state.running} toggle={this.toggleClock} />
        <ResetButton reset={this.resetClock} />
        <h3>Total Timer</h3>
        <h4>Job started at: {this.state.jobStartTime}</h4>
        <Clock running={this.state.running}>
          {this.formatTime(this.state.totalTimer)}
        </Clock>
        <h3>Current Timer</h3>
        <h4>Current Timer started at {this.state.startTime}</h4>
        <Clock running={this.state.running}>
          {this.formatTime(this.state.currentTimer)}
        </Clock>
        <h3>
          ${((this.state.amount / this.state.totalTimer) * 3600).toFixed(2)}
        </h3>
        <DataForm
          onChange={this.onChange}
          completeJob={this.completeJob}
          amount={this.state.amount}
          jobName={this.state.jobName}
        />
      </div>
    );
  }
}

export default Home;
