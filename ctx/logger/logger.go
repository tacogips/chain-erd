package logger

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/Sirupsen/logrus"
)

type loggerKey int

var key loggerKey = 1

// FromContext
func FromContext(c context.Context) *logrus.Logger {
	l, ok := c.Value(key).(*logrus.Logger)
	if !ok {
		panic(fmt.Errorf("no logger in the app context"))
	}
	return l
}

var TTYLogger = &LoggerConfig{
	Type: "tty",
}

var NoLogger = &LoggerConfig{
	Type: "/dev/null",
}

type LoggerConfig struct {
	Type  string
	Level logrus.Level
}

func (l *LoggerConfig) SetLevel(level logrus.Level) *LoggerConfig {
	l.Level = level
	return l
}

func WithContext(c context.Context, config *LoggerConfig) (context.Context, error) {
	l := logrus.New()

	switch config.Type {
	case "tty":
		l.Formatter = new(logrus.TextFormatter)
		l.Out = os.Stdout

	case "/dev/null":
		l.Out = ioutil.Discard

	default:
		l.Formatter = new(logrus.TextFormatter)
		l.Out = os.Stdout
	}
	l.SetLevel(config.Level)

	return c, nil
}

func Info(c context.Context, s ...interface{}) {
	l := FromContext(c)
	l.Info(s...)
}

func Infof(c context.Context, f string, s ...interface{}) {
	l := FromContext(c)
	l.Infof(f, s...)
}

func Debug(c context.Context, s ...interface{}) {
	l := FromContext(c)
	l.Debug(s...)
}

func Debugf(c context.Context, f string, s ...interface{}) {
	l := FromContext(c)
	l.Debugf(f, s...)
}

func Fatal(c context.Context, s ...interface{}) {
	l := FromContext(c)
	l.Fatal(s...)
}

func Fatalf(c context.Context, f string, s ...interface{}) {
	l := FromContext(c)
	l.Fatalf(f, s...)
}
