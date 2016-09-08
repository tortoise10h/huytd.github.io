# DIY Monitoring Dashboard

How to build monitoring tool like Datadog or PM2

## The Data

Get Total CPU usage ([Source](http://stackoverflow.com/questions/30855440/how-to-get-cpu-utilization-in-in-terminal-mac))

```
ps -A -o %cpu | awk '{s+=$1} END {print s "%"}'
```

Output:

```
5%
```

The parameters:

- `-A`: read all processes
- `-o`: specify the output we want to read


